const mongoose = require('mongoose');
const Application = require('./src/models/Application');
const Job = require('./src/models/Job');
const InstitutionProfile = require('./src/models/InstitutionProfile');

async function testStats() {
  try {
    await mongoose.connect('mongodb://localhost:27017/teacher_portal');

    // Get first institution profile
    const institution = await InstitutionProfile.findOne();
    if (!institution) {
      console.log('No institution found');
      return;
    }

    console.log('Institution found:', institution.institutionName);

    // Find jobs for this institution
    const jobs = await Job.find({ institutionId: institution._id });
    const jobIds = jobs.map(job => job._id);

    console.log('Jobs found:', jobs.length);

    // Aggregate stats
    const stats = await Application.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('Current application statuses:', stats);

    // Check if there are any applications with 'accepted' or 'rejected' status
    const acceptedApps = await Application.find({ jobId: { $in: jobIds }, status: 'accepted' });
    const rejectedApps = await Application.find({ jobId: { $in: jobIds }, status: 'rejected' });

    console.log('Accepted applications:', acceptedApps.length);
    console.log('Rejected applications:', rejectedApps.length);

    // Show all applications for this institution
    const allApps = await Application.find({ jobId: { $in: jobIds } });
    console.log('Total applications:', allApps.length);
    console.log('Application statuses:');
    allApps.forEach(app => {
      console.log(`- ${app.status}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testStats();
