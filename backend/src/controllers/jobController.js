const Job = require("../models/Job")
const Application = require("../models/Application")

const fetch = global.fetch || require('node-fetch')

async function geocodeFromAddressServer(pinCode, city, state) {
  try {
    const parts = [pinCode, city, state].filter(Boolean).join(' ')
    if (!parts) return null
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(parts)}&limit=1`
    const resp = await fetch(url, { headers: { 'User-Agent': 'TeacherWorld/1.0 (dev)', 'Accept-Language': 'en' } })
    if (!resp.ok) return null
    const results = await resp.json()
    if (!results || results.length === 0) return null
    const r = results[0]
    return { latitude: Number.parseFloat(r.lat), longitude: Number.parseFloat(r.lon) }
  } catch (e) {
    console.error('[GEOCODE] Server geocode error:', e && e.message ? e.message : e)
    return null
  }
}

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      qualifications,
      responsibilities,
      requirements,
      benefits,
      experienceRequired,
      jobType,
      salaryRange,
      city,
      state,
      location,
      pinCode,
      startDate,
      deadline,
      employmentType,
      latitude,
      longitude,
    } = req.body

    // Accept string coordinates and normalize
    let lat = latitude
    let lng = longitude
    if (lat !== undefined && lat !== null && lat !== '') lat = Number.parseFloat(lat)
    if (lng !== undefined && lng !== null && lng !== '') lng = Number.parseFloat(lng)

    // If coordinates missing, attempt server-side geocoding using pinCode/city/state
    if (lat === undefined || lng === undefined || Number.isNaN(lat) || Number.isNaN(lng)) {
      const geo = await geocodeFromAddressServer(pinCode, city, state)
      if (geo) {
        lat = geo.latitude
        lng = geo.longitude
        console.log(`[GEOCODE] Resolved coords for job: lat=${lat}, lng=${lng}`)
      } else {
        return res.status(400).json({ message: "Latitude and longitude are required" })
      }
    }

    const institutionId = req.user && req.user.institutionProfileId // Set from middleware

    if (!institutionId) {
      return res.status(403).json({ message: "User is not associated with an institution profile. Please complete your institution profile before posting jobs." })
    }

    const job = new Job({
      institutionId,
      title,
      description,
      subject,
      qualifications: Array.isArray(qualifications) ? qualifications : [qualifications],
      responsibilities: responsibilities ? responsibilities.split('\n').filter(r => r.trim()) : [],
      requirements: requirements ? requirements.split('\n').filter(r => r.trim()) : [],
      benefits: benefits ? benefits.split('\n').filter(b => b.trim()) : [],
      experienceRequired,
      jobType,
      salaryRange,
      city,
      state,
      location,
      pinCode,
      startDate,
      deadline,
      employmentType,
      coordinates: {
        type: "Point",
        coordinates: [Number.parseFloat(lng), Number.parseFloat(lat)]
      },
      institutionRating: req.body.institutionRating || 0,
      employeeCount: req.body.employeeCount || 0,
    })

    await job.save()
    res.status(201).json({ message: "Job created", job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getJobs = async (req, res) => {
  try {
    const { city, state, pinCode, subject, search, skip = 0, limit = 10 } = req.query

    const filter = { status: "active" }

    if (city) filter.city = city
    if (state) filter.state = state
    if (pinCode) filter.pinCode = pinCode
    if (subject) filter.subject = subject
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const jobs = await Job.find(filter)
      .populate("institutionId", "institutionName phoneNumber photo")
      .skip(Number.parseInt(skip))
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Job.countDocuments(filter)

    res.json({ jobs, total, pages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("institutionId", "institutionName phoneNumber photo")

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    // Increment view count automatically
    job.viewCount += 1
    await job.save()

    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.nearbyJobs = async (req, res) => {
  try {
    const { latitude, longitude, radius = 50 } = req.query

    console.log(`[NEARBY-JOBS] Request: lat=${latitude}, lng=${longitude}, radius=${radius}`)

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: "Latitude and longitude are required" })
    }

    // First check if there are any jobs with coordinates
    const jobsWithCoords = await Job.find({ coordinates: { $exists: true } }).limit(5)
    console.log(`[NEARBY-JOBS] Jobs with coordinates found: ${jobsWithCoords.length}`)

    const jobs = await Job.find({
      status: "active",
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number.parseFloat(longitude), Number.parseFloat(latitude)],
          },
          $maxDistance: Number.parseInt(radius) * 1000, // Convert km to meters
        },
      },
    }).populate("institutionId", "institutionName phoneNumber photo")

    console.log(`[NEARBY-JOBS] Found ${jobs.length} nearby jobs`)

    res.json({ jobs })
  } catch (error) {
    console.error(`[NEARBY-JOBS] Error:`, error.message)
    res.status(500).json({ message: error.message })
  }
}

exports.updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      qualifications,
      responsibilities,
      requirements,
      benefits,
      experienceRequired,
      jobType,
      salaryRange,
      city,
      state,
      location,
      pinCode,
      startDate,
      deadline,
      employmentType,
      latitude,
      longitude,
    } = req.body
    const institutionId = req.user.institutionProfileId

    const job = await Job.findOne({ _id: req.params.id, institutionId })
    if (!job) {
      return res.status(404).json({ message: "Job not found or not owned by institution" })
    }

    // Update fields
    if (title) job.title = title
    if (description) job.description = description
    if (subject) job.subject = subject
    if (qualifications) job.qualifications = Array.isArray(qualifications) ? qualifications : [qualifications]
    if (responsibilities) job.responsibilities = responsibilities.split('\n').filter(r => r.trim())
    if (requirements) job.requirements = requirements.split('\n').filter(r => r.trim())
    if (benefits) job.benefits = benefits.split('\n').filter(b => b.trim())
    if (experienceRequired) job.experienceRequired = experienceRequired
    if (jobType) job.jobType = jobType
    if (salaryRange) job.salaryRange = salaryRange
    if (city) job.city = city
    if (state) job.state = state
    if (location) job.location = location
    if (pinCode) job.pinCode = pinCode
    if (startDate) job.startDate = startDate
    if (deadline) job.deadline = deadline
    if (employmentType) job.employmentType = employmentType
    if (latitude !== undefined && longitude !== undefined) {
      job.coordinates = {
        type: "Point",
        coordinates: [Number.parseFloat(longitude), Number.parseFloat(latitude)],
      }
    }

    await job.save()
    res.json({ message: "Job updated", job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getJobsByInstitution = async (req, res) => {
  try {
    const institutionId = req.user.institutionProfileId // Set from middleware

    const jobs = await Job.find({ institutionId }).sort({ createdAt: -1 })

    // Get application counts for each job
    const jobsWithApplications = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({ jobId: job._id })
        return {
          id: job._id,
          title: job.title,
          applications: applicationCount,
          status: job.status,
          posted: job.createdAt.toLocaleDateString(),
          deadline: job.deadline ? new Date(job.deadline).toLocaleDateString() : null,
          subject: job.subject,
          city: job.city,
          state: job.state,
        }
      })
    )

    res.json(jobsWithApplications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      qualifications,
      responsibilities,
      requirements,
      benefits,
      experienceRequired,
      jobType,
      salaryRange,
      city,
      state,
      location,
      pinCode,
      startDate,
      deadline,
    employmentType,
  } = req.body
  const institutionId = req.user.institutionProfileId

  const job = await Job.findOne({ _id: req.params.id, institutionId })
  if (!job) {
    return res.status(404).json({ message: "Job not found or not owned by institution" })
  }

  // Update fields
  if (title) job.title = title
  if (description) job.description = description
  if (subject) job.subject = subject
  if (qualifications) job.qualifications = Array.isArray(qualifications) ? qualifications : [qualifications]
  if (responsibilities) job.responsibilities = responsibilities.split('\n').filter(r => r.trim())
  if (requirements) job.requirements = requirements.split('\n').filter(r => r.trim())
  if (benefits) job.benefits = benefits.split('\n').filter(b => b.trim())
  if (experienceRequired) job.experienceRequired = experienceRequired
  if (jobType) job.jobType = jobType
  if (salaryRange) job.salaryRange = salaryRange
  if (city) job.city = city
  if (state) job.state = state
  if (location) job.location = location
  if (pinCode) job.pinCode = pinCode
  if (startDate) job.startDate = startDate
  if (deadline) job.deadline = deadline
  if (employmentType) job.employmentType = employmentType

  await job.save()
  res.json({ message: "Job updated", job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteJob = async (req, res) => {
  try {
    const institutionId = req.user.institutionProfileId

    const job = await Job.findOneAndDelete({ _id: req.params.id, institutionId })
    if (!job) {
      return res.status(404).json({ message: "Job not found or not owned by institution" })
    }

    // Optionally delete related applications
    await Application.deleteMany({ jobId: req.params.id })

    res.json({ message: "Job deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
