# MongoDB Setup Guide for TeacherWorld Job Portal

## Overview
This guide covers setting up MongoDB for the TeacherWorld application both locally and on MongoDB Atlas (cloud).

## Local MongoDB Setup

### Option 1: Windows
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows Service and start automatically
4. Verify installation by opening Command Prompt and running:
   \`\`\`
   mongosh
   \`\`\`

### Option 2: macOS (using Homebrew)
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
mongosh
\`\`\`

### Option 3: Linux (Ubuntu/Debian)
\`\`\`bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiarch" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
mongosh
\`\`\`

## MongoDB Atlas Setup (Cloud)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Sign up with your email

### Step 2: Create Cluster
1. Click "Create a Deployment"
2. Choose "Shared" (Free tier)
3. Select your region
4. Click "Create Deployment"

### Step 3: Configure Database Access
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Assign "Atlas admin" role
5. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters"
2. Click "Connect"
3. Select "Drivers"
4. Copy the connection string
5. Replace `<password>` and `<dbname>` with your credentials

## Environment Variables Configuration

### Local Setup (.env file)
\`\`\`
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teacher-portal
JWT_SECRET=your_super_secret_jwt_key_change_this
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

### Cloud Setup (MongoDB Atlas)
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/teacher-portal?retryWrites=true&w=majority
\`\`\`

## Database Collections Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  name: String,
  role: String (enum: ["teacher", "institution"]),
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### TeacherProfile Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique, indexed),
  phoneNumber: String,
  dateOfBirth: Date,
  gender: String,
  education: [{
    degree: String,
    field: String,
    institution: String,
    graduationYear: Number,
    gpa: Number
  }],
  skills: [String],
  experience: [{
    title: String,
    institution: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  city: String,
  state: String,
  country: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  resumeUrl: String,
  marksCardUrl: String,
  certificateUrls: [String],
  bio: String,
  availability: String (enum: ["immediately", "1-month", "3-months"]),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### InstitutionProfile Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique, indexed),
  institutionName: String,
  phoneNumber: String,
  address: String,
  city: String,
  state: String,
  country: String,
  type: String (enum: ["school", "college", "university"]),
  website: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Jobs Collection
\`\`\`javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  institutionId: ObjectId (ref: InstitutionProfile, indexed),
  qualifications: [String],
  salary: Number,
  location: String,
  type: String (enum: ["full-time", "part-time", "contract"]),
  status: String (enum: ["open", "closed"]),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Applications Collection
\`\`\`javascript
{
  _id: ObjectId,
  jobId: ObjectId (ref: Job),
  teacherId: ObjectId (ref: TeacherProfile),
  status: String (enum: ["applied", "reviewed", "shortlisted", "rejected", "hired"]),
  appliedAt: Date,
  updatedAt: Date
}
\`\`\`

## Indexes for Performance

Create these indexes in your MongoDB database:

\`\`\`javascript
// Users indexes
db.users.createIndex({ email: 1 }, { unique: true });

// Teacher Profile indexes
db.teacherprofiles.createIndex({ userId: 1 }, { unique: true });
db.teacherprofiles.createIndex({ city: 1 });
db.teacherprofiles.createIndex({ coordinates: "2dsphere" });

// Institution Profile indexes
db.institutionprofiles.createIndex({ userId: 1 }, { unique: true });

// Jobs indexes
db.jobs.createIndex({ institutionId: 1 });
db.jobs.createIndex({ status: 1 });

// Applications indexes
db.applications.createIndex({ jobId: 1 });
db.applications.createIndex({ teacherId: 1 });
db.applications.createIndex([
  { jobId: 1, teacherId: 1 }
], { unique: true });
\`\`\`

## Data Backup & Export

### Export Database
\`\`\`bash
mongodump --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/teacher-portal" --out ./backup
\`\`\`

### Import Database
\`\`\`bash
mongorestore --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/teacher-portal" ./backup
\`\`\`

## Troubleshooting

### Connection Issues
1. Check MongoDB service is running
2. Verify connection string format
3. Check firewall settings
4. Verify network access in MongoDB Atlas

### Performance Issues
1. Create indexes for frequently queried fields
2. Monitor query performance in MongoDB Compass
3. Check database size limits on Atlas

### Authentication Issues
1. Verify username and password
2. Check IP whitelist in MongoDB Atlas
3. Ensure password is URL-encoded in connection string
