const axios = require('axios')

async function testNearbyJobs() {
  try {
    console.log('Testing nearby jobs endpoint...')

    const response = await axios.get('http://localhost:5001/api/jobs/nearby', {
      params: {
        latitude: 12.9716,
        longitude: 77.5946,
        radius: 100
      }
    })

    console.log('Response status:', response.status)
    console.log('Response data:', JSON.stringify(response.data, null, 2))

  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

testNearbyJobs()
