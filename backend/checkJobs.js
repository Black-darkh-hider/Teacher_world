const mongoose = require('mongoose')
const Job = require('./src/models/Job')

require('dotenv').config()

async function checkJobs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const totalJobs = await Job.countDocuments()
    const jobsWithCoords = await Job.countDocuments({ coordinates: { $exists: true } })
    const activeJobs = await Job.countDocuments({ status: 'active' })

    console.log(`Total jobs: ${totalJobs}`)
    console.log(`Jobs with coordinates: ${jobsWithCoords}`)
    console.log(`Active jobs: ${activeJobs}`)

    const sampleJob = await Job.findOne({ coordinates: { $exists: true } })
    if (sampleJob) {
      console.log('Sample job with coordinates:', {
        title: sampleJob.title,
        city: sampleJob.city,
        coordinates: sampleJob.coordinates
      })
    } else {
      console.log('No jobs found with coordinates')
    }

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
  }
}

checkJobs()
