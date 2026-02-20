const Job = require("../models/Job");
const Institution = require("../models/Institution");
const axios = require("axios");

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get coordinates from address using Google Geocoding API
exports.getCoordinates = async (address) => {
  try {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key not configured");
      return null;
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: { address, key: GOOGLE_MAPS_API_KEY },
      }
    );

    if (response.data.results.length === 0) return null;

    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return null;
  }
};

// Find nearby jobs based on coordinates
exports.findNearbyJobs = async (req, res) => {
  try {
    const { latitude, longitude, radius = 50, state, city, pinCode } = req.query;

    let query = {};

    // Build query based on filters
    if (state) query.state = state;
    if (city) query.city = new RegExp(city, "i");
    if (pinCode) query.pinCode = pinCode;

    // Fetch jobs with populated institution data
    const jobs = await Job.find(query)
      .populate("institutionId", "institutionName address location")
      .lean();

    if (!jobs || jobs.length === 0) {
      return res.json({ jobs: [], message: "No jobs found" });
    }

    let filteredJobs = jobs;

    // If coordinates provided, filter by distance
    if (latitude && longitude) {
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);

      if (!isNaN(userLat) && !isNaN(userLng)) {
        const radiusKm = parseFloat(radius);

        filteredJobs = jobs
          .map((job) => {
            // Try to get coordinates from job or institution
            let jobLat, jobLng;

            if (job.location && job.location.coordinates) {
              [jobLng, jobLat] = job.location.coordinates;
            } else if (
              job.institutionId &&
              job.institutionId.location &&
              job.institutionId.location.lat &&
              job.institutionId.location.lng
            ) {
              jobLat = job.institutionId.location.lat;
              jobLng = job.institutionId.location.lng;
            }

            if (jobLat && jobLng) {
              const distance = getDistance(userLat, userLng, jobLat, jobLng);
              return { ...job, distance };
            }

            return { ...job, distance: null };
          })
          .filter((job) => job.distance !== null && job.distance <= radiusKm)
          .sort((a, b) => a.distance - b.distance);
      }
    }

    res.json({ jobs: filteredJobs, count: filteredJobs.length });
  } catch (error) {
    console.error("Error finding nearby jobs:", error);
    res.status(500).json({ message: error.message });
  }
};

// Search jobs by location name
exports.searchByLocation = async (req, res) => {
  try {
    const { location, radius = 50, state } = req.query;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    // Get coordinates for the location
    const coords = await exports.getCoordinates(location);

    if (!coords) {
      return res.status(400).json({ message: "Location not found" });
    }

    let query = {};
    if (state) query.state = state;

    const jobs = await Job.find(query)
      .populate("institutionId", "institutionName address location")
      .lean();

    if (!jobs || jobs.length === 0) {
      return res.json({
        jobs: [],
        searchCenter: coords,
        message: "No jobs found",
      });
    }

    const radiusKm = parseFloat(radius);

    const nearbyJobs = jobs
      .map((job) => {
        let jobLat, jobLng;

        if (job.location && job.location.coordinates) {
          [jobLng, jobLat] = job.location.coordinates;
        } else if (
          job.institutionId &&
          job.institutionId.location &&
          job.institutionId.location.lat &&
          job.institutionId.location.lng
        ) {
          jobLat = job.institutionId.location.lat;
          jobLng = job.institutionId.location.lng;
        }

        if (jobLat && jobLng) {
          const distance = getDistance(coords.lat, coords.lng, jobLat, jobLng);
          return { ...job, distance };
        }

        return { ...job, distance: null };
      })
      .filter((job) => job.distance !== null && job.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    res.json({ jobs: nearbyJobs, searchCenter: coords, count: nearbyJobs.length });
  } catch (error) {
    console.error("Error searching by location:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all unique states and cities from jobs
exports.getAvailableLocations = async (req, res) => {
  try {
    const states = await Job.distinct("state");
    const cities = await Job.distinct("city");

    res.json({ states: states.filter(Boolean), cities: cities.filter(Boolean) });
  } catch (error) {
    console.error("Error getting available locations:", error);
    res.status(500).json({ message: error.message });
  }
};