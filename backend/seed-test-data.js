const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./src/models/User')
const InstitutionProfile = require('./src/models/InstitutionProfile')
const Job = require('./src/models/Job')

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/teacher-portal')
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// Seed test data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await InstitutionProfile.deleteMany({})
    await Job.deleteMany({})

    console.log('Cleared existing data')

    // Create test institution user
    const hashedPassword = await bcrypt.hash('password123', 10)
    const institutionUser = new User({
      email: 'test@school.com',
      password: hashedPassword,
      role: 'institution',
      isVerified: true
    })
    await institutionUser.save()

    // Create institution profile
    const institutionProfile = new InstitutionProfile({
      userId: institutionUser._id,
      institutionName: 'Test School District',
      phoneNumber: '+1234567890',
      address: '123 Education St, Test City, TC 12345',
      city: 'Test City',
      state: 'Test State',
      country: 'USA',
      website: 'https://testschool.com',
      description: 'A leading educational institution',
      photo: 'https://via.placeholder.com/150',
      institutionType: 'School District',
      employeeCount: 500,
      establishedYear: 1990
    })
    await institutionProfile.save()

    // Update user with profile ID
    institutionUser.institutionProfileId = institutionProfile._id
    await institutionUser.save()

    // Create test jobs
    const jobs = [
      {
        institutionId: institutionProfile._id,
        title: 'Mathematics Teacher',
        description: 'We are seeking a passionate Mathematics Teacher to join our team.',
        subject: 'Mathematics',
        qualifications: ['Bachelor\'s in Mathematics', 'Teaching Certificate'],
        responsibilities: ['Teach mathematics to high school students', 'Develop lesson plans', 'Assess student performance'],
        requirements: ['3+ years teaching experience', 'Strong communication skills'],
        benefits: ['Health insurance', 'Retirement plan', 'Professional development'],
        experienceRequired: '3+ years',
        jobType: 'full-time',
        salaryRange: '$45,000 - $65,000',
        city: 'Test City',
        state: 'Test State',
        location: '123 Education St, Test City, TC 12345',
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006
        },
        startDate: new Date('2024-09-01'),
        deadline: new Date('2024-08-15'),
        employmentType: 'full-time',
        status: 'active'
      },
      {
        institutionId: institutionProfile._id,
        title: 'Science Teacher',
        description: 'Join our science department as a dedicated Science Teacher.',
        subject: 'Science',
        qualifications: ['Bachelor\'s in Science', 'Teaching Certificate'],
        responsibilities: ['Teach science subjects', 'Conduct experiments', 'Grade assignments'],
        requirements: ['2+ years teaching experience', 'Lab experience preferred'],
        benefits: ['Health insurance', 'Paid time off', 'Tuition reimbursement'],
        experienceRequired: '2+ years',
        jobType: 'full-time',
        salaryRange: '$42,000 - $62,000',
        city: 'Test City',
        state: 'Test State',
        location: '456 Learning Ave, Test City, TC 12345',
        coordinates: {
          latitude: 40.730,
          longitude: -73.935
        },
        startDate: new Date('2024-09-01'),
        deadline: new Date('2024-08-20'),
        employmentType: 'full-time',
        status: 'active'
      },
      {
        institutionId: institutionProfile._id,
        title: 'English Teacher',
        description: 'We need an enthusiastic English Teacher for our language arts program.',
        subject: 'English',
        qualifications: ['Bachelor\'s in English', 'Teaching Certificate'],
        responsibilities: ['Teach reading and writing', 'Develop curriculum', 'Support student literacy'],
        requirements: ['1+ years teaching experience', 'Strong grammar skills'],
        benefits: ['Health insurance', 'Professional development', 'Flexible schedule'],
        experienceRequired: '1+ years',
        jobType: 'full-time',
        salaryRange: '$40,000 - $60,000',
        city: 'Nearby City',
        state: 'Test State',
        location: '789 Knowledge Blvd, Nearby City, TC 12346',
        coordinates: {
          latitude: 40.8,
          longitude: -74.1
        },
        startDate: new Date('2024-09-01'),
        deadline: new Date('2024-08-25'),
        employmentType: 'full-time',
        status: 'active'
      }
    ]

    for (const jobData of jobs) {
      const job = new Job(jobData)
      await job.save()
    }

    console.log('Test data seeded successfully!')
    console.log('Institution login: test@school.com / password123')
    console.log('Created 3 test jobs')

  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Run the seed function
connectDB().then(() => {
  seedData()
})
