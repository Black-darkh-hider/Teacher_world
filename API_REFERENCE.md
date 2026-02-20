# API Reference

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication Endpoints

### Register Teacher
\`\`\`
POST /auth/register-teacher
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "secure_password",
  "name": "John Doe"
}

Response: { message: "OTP sent to email", email: "..." }
\`\`\`

### Verify OTP & Complete Registration
\`\`\`
POST /auth/verify-otp
Content-Type: application/json

{
  "email": "teacher@example.com",
  "otp": "123456",
  "tempData": {
    "tempEmail": "teacher@example.com",
    "tempPassword": "secure_password",
    "tempName": "John Doe",
    "tempRole": "teacher"
  }
}

Response: {
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": { id, email, name, role }
}
\`\`\`

### Login
\`\`\`
POST /auth/login
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "secure_password",
  "role": "teacher"
}

Response: {
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": { id, email, name, role }
}
\`\`\`

### Google OAuth Callback
\`\`\`
POST /auth/google/callback
Content-Type: application/json

{
  "token": "google_id_token",
  "role": "teacher"
}

Response: {
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": { id, email, name, role }
}
\`\`\`

## Job Endpoints

### List Jobs
\`\`\`
GET /jobs?search=keywords&city=CityName&limit=20

Response: {
  "jobs": [
    {
      "_id": "...",
      "title": "Math Teacher",
      "description": "...",
      "city": "New York",
      "salary": { "min": 50000, "max": 70000 },
      "employmentType": "Full-time",
      "institutionId": { "institutionName": "..." }
    }
  ]
}
\`\`\`

### Create Job (Institution)
\`\`\`
POST /jobs
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Math Teacher",
  "description": "Teach mathematics to students",
  "city": "New York",
  "salary": { "min": 50000, "max": 70000 },
  "employmentType": "Full-time",
  "requirements": ["B.Ed", "5+ years experience"],
  "coordinates": { "latitude": 40.7128, "longitude": -74.0060 }
}

Response: { message: "Job created", job: {...} }
\`\`\`

## Location Endpoints

### Find Nearby Jobs
\`\`\`
GET /location/nearby?latitude=40.7128&longitude=-74.0060&radius=50

Response: {
  "jobs": [
    {
      ...,
      "distance": 5.2  // in km
    }
  ]
}
\`\`\`

### Search Jobs by Location
\`\`\`
GET /location/search?location=New%20York&radius=50

Response: {
  "jobs": [...],
  "searchCenter": { "lat": 40.7128, "lng": -74.0060 }
}
\`\`\`

## Application Endpoints

### Apply to Job
\`\`\`
POST /applications
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "jobId": "job_id",
  "coverLetter": "Why I'm interested..."
}

Response: { message: "Application submitted", application: {...} }
\`\`\`

### Get My Applications
\`\`\`
GET /applications
Authorization: Bearer jwt_token

Response: {
  "applications": [
    {
      "_id": "...",
      "jobId": {...},
      "status": "pending",
      "statusHistory": [...]
    }
  ]
}
\`\`\`

### Update Application Status (Institution)
\`\`\`
PATCH /applications/:id/status
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "status": "accepted",
  "notes": "Congratulations!"
}

Response: { message: "Status updated", application: {...} }
\`\`\`

## Profile Endpoints

### Get Profile
\`\`\`
GET /profile
Authorization: Bearer jwt_token

Response: {
  "profile": {
    "userId": "...",
    "education": [...],
    "skills": [...],
    "certificates": [...]
  }
}
\`\`\`

### Update Profile
\`\`\`
PUT /profile
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "education": [
    {
      "degree": "B.Ed",
      "university": "University Name",
      "year": 2020
    }
  ],
  "skills": ["Mathematics", "Physics"],
  "bio": "Experienced teacher..."
}

Response: { message: "Profile updated", profile: {...} }
\`\`\`

### Upload Document
\`\`\`
POST /profile/upload
Authorization: Bearer jwt_token
Content-Type: multipart/form-data

FormData:
- file: (binary)
- type: "certificate" | "resume" | "material"

Response: {
  "message": "File uploaded",
  "fileUrl": "/uploads/certificates/..."
}
\`\`\`

---

## Error Responses

All endpoints return errors in this format:

\`\`\`json
{
  "message": "Error description"
}
\`\`\`

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `500` - Server error
