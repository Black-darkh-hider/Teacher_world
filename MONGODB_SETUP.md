# MongoDB Setup Guide for TeacherWorld Job Portal

## Overview
This guide helps you set up MongoDB Compass and connect it to your TeacherWorld job portal backend.

## Prerequisites
- MongoDB Community Server installed locally OR access to MongoDB Cloud (Atlas)
- MongoDB Compass installed (GUI for database management)
- Backend running on port 5000
- Environment variables configured

## Option 1: Local MongoDB Setup

### Step 1: Install MongoDB Community Server
1. Visit https://www.mongodb.com/try/download/community
2. Download the appropriate version for your OS
3. Run the installer and follow the prompts
4. Select "Install MongoDB as a Windows Service" (or equivalent for your OS)

### Step 2: Verify MongoDB is Running
\`\`\`bash
# Check if MongoDB is running (Windows)
net start MongoDB

# For macOS
brew services list

# For Linux
sudo systemctl status mongod
\`\`\`

### Step 3: Install MongoDB Compass
1. Visit https://www.mongodb.com/products/compass
2. Download and install the GUI tool
3. Launch MongoDB Compass

### Step 4: Connect to Local Database
1. In MongoDB Compass, use connection string:
   \`\`\`
   mongodb://localhost:27017
   \`\`\`
2. Click "Connect"
3. You should see your local MongoDB databases

### Step 5: Configure Backend
Add to your `.env` file:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/teacher-portal
NODE_ENV=development
\`\`\`

## Option 2: MongoDB Cloud (Atlas) Setup

### Step 1: Create MongoDB Atlas Account
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Select "Shared" (Free tier)
3. Choose your provider (AWS, Google Cloud, or Azure)
4. Select nearest region
5. Click "Create Cluster"

### Step 3: Set Up Database Access
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Select "Cluster Only" for privileges
5. Click "Create User"

### Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. In Clusters, click "Connect"
2. Select "Compass"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<database>` with `teacher-portal`

Example:
\`\`\`
mongodb+srv://username:password@cluster.mongodb.net/teacher-portal
\`\`\`

### Step 6: Configure Backend
Add to your `.env` file:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teacher-portal
NODE_ENV=production
\`\`\`

## Verify Database Connection

### Using MongoDB Compass
1. Open MongoDB Compass
2. Connect using your connection string
3. You should see the following databases:
   - `teacher-portal` (main database)
   - Look for collections:
     - `users`
     - `teacherprofiles`
     - `institutionprofiles`
     - `jobs`
     - `applications`
     - `studymaterials`
     - `otptokens`

### Using Backend Health Check
\`\`\`bash
# Run this command to verify backend connection
curl http://localhost:5000/api/health

# Should respond with:
# {"status":"OK","timestamp":"2025-01-11T12:00:00Z"}
\`\`\`

## Database Collections Overview

### users
Stores user accounts for both teachers and institutions
\`\`\`javascript
{
  _id: ObjectId,
  email: string (unique),
  password: string (hashed),
  name: string,
  role: "teacher" | "institution",
  verified: boolean,
  createdAt: date,
  updatedAt: date
}
\`\`\`

### teacherprofiles
Teacher personal and professional information
\`\`\`javascript
{
  userId: ObjectId (reference to users),
  phoneNumber: string,
  dateOfBirth: date,
  gender: string,
  education: [{degree, field, institution, graduationYear, gpa}],
  skills: [string],
  experience: [{title, institution, startDate, endDate, description}],
  resumeUrl: string,
  marksCardUrl: string,
  certificateUrls: [string],
  bio: string,
  city: string,
  state: string,
  country: string,
  coordinates: {latitude, longitude}
}
\`\`\`

### institutionprofiles
Institution information
\`\`\`javascript
{
  userId: ObjectId,
  institutionName: string,
  phoneNumber: string,
  address: string,
  city: string,
  state: string,
  country: string,
  type: string,
  website: string
}
\`\`\`

### jobs
Job postings by institutions
\`\`\`javascript
{
  _id: ObjectId,
  institutionId: ObjectId,
  title: string,
  description: string,
  requirements: [string],
  salary: number,
  location: string,
  postedDate: date
}
\`\`\`

### applications
Teacher applications for jobs
\`\`\`javascript
{
  _id: ObjectId,
  teacherId: ObjectId,
  jobId: ObjectId,
  status: "pending" | "accepted" | "rejected",
  appliedDate: date
}
\`\`\`

## Troubleshooting

### Issue: Cannot Connect to MongoDB
**Solution:**
1. Verify MongoDB service is running: `net start MongoDB` (Windows)
2. Check firewall settings (allow port 27017)
3. Verify connection string in `.env` file
4. Restart backend server

### Issue: Connection String Error
**Solution:**
- Ensure password doesn't contain special characters
- If it does, URL-encode the password
- Example: `@` becomes `%40`

### Issue: Collections Not Appearing
**Solution:**
1. Run seed data: `node backend/seeds/seed.js`
2. Create test users through registration
3. Refresh MongoDB Compass

## Data Management

### Backup Database
\`\`\`bash
# Using MongoDB Tools
mongodump --db teacher-portal --out ./backup

# Restore
mongorestore --db teacher-portal ./backup/teacher-portal
\`\`\`

### View Database Statistics
In MongoDB Compass:
1. Select database `teacher-portal`
2. Click "Stats"
3. View collection sizes and document counts

## Next Steps
1. Connect MongoDB Compass
2. Verify all collections are created
3. Run backend seed file for test data
4. Test application registration and login
5. Verify profile creation and file uploads

For issues, check backend logs in terminal where server is running.
