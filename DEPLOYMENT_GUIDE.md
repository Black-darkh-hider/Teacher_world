# Deployment Guide for TeacherWorld Job Portal

## Prerequisites
- Git repository set up (GitHub)
- Backend and frontend folders properly structured
- Environment variables configured
- MongoDB Atlas account (for cloud database)

## Backend Deployment (Render/Railway/Heroku)

### Using Render.com (Recommended)

#### Step 1: Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit: TeacherWorld job portal"
git push origin main
\`\`\`

#### Step 2: Create Render Account
1. Visit https://render.com
2. Sign up with GitHub
3. Connect your GitHub account

#### Step 3: Deploy Backend
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: `teacherworld-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node backend/server.js`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `FRONTEND_URL`: Your frontend URL
   - `GMAIL_USER`: Your email
   - `GMAIL_PASSWORD`: Your app password
   - `JWT_SECRET`: Random secure string
   - `REFRESH_TOKEN_SECRET`: Random secure string
6. Click "Deploy"

#### Step 4: Monitor Deployment
- Check logs for any errors
- Verify API health: `https://your-api.onrender.com/api/health`

### Using Vercel for Frontend

#### Step 1: Push Frontend to GitHub
\`\`\`bash
cd frontend
git init
git add .
git commit -m "TeacherWorld frontend"
git push origin main
\`\`\`

#### Step 2: Connect to Vercel
1. Visit https://vercel.com
2. Sign up with GitHub
3. Select your frontend repository
4. Configure:
   - Framework: Vite
   - Root Directory: frontend
5. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
6. Click "Deploy"

## Frontend Deployment (Vercel/Netlify)

### Update Frontend Configuration
\`\`\`javascript
// frontend/vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
}
\`\`\`

### Update Backend CORS
\`\`\`javascript
// backend/server.js
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
\`\`\`

## Environment Variables Checklist

### Backend (.env)
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `FRONTEND_URL` - Frontend deployed URL
- [ ] `GMAIL_USER` - Email for notifications
- [ ] `GMAIL_PASSWORD` - App password
- [ ] `JWT_SECRET` - Secure random string
- [ ] `REFRESH_TOKEN_SECRET` - Secure random string
- [ ] `PORT` - Usually 5000
- [ ] `GOOGLE_MAPS_API_KEY` - For location services

### Frontend (.env)
- [ ] `VITE_API_URL` - Backend API URL
- [ ] `VITE_GOOGLE_MAPS_API_KEY` - Google Maps key

## Testing Deployment

### Test Backend
\`\`\`bash
curl https://your-api.onrender.com/api/health
# Should return: {"status":"OK","timestamp":"..."}
\`\`\`

### Test Frontend
1. Visit your Vercel/Netlify deployed URL
2. Try registering a test account
3. Verify email verification works
4. Test job browsing
5. Test profile creation with file uploads

## Monitoring

### Logs
- **Render**: Dashboard → Logs
- **Vercel**: Dashboard → Logs
- **MongoDB Atlas**: Cluster → Monitoring

### Performance
- Check API response times
- Monitor MongoDB connection pool
- Review error rates

## Scaling Recommendations

### When to Scale
- Users: > 10,000
- Requests: > 100/second
- Database Size: > 10GB

### Scaling Steps
1. Upgrade MongoDB Atlas cluster
2. Add caching layer (Redis)
3. Use CDN for static assets
4. Implement database indexing
5. Add load balancing

## Security Checklist
- [ ] Enable MongoDB IP whitelist
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS everywhere
- [ ] Set up rate limiting
- [ ] Implement CORS properly
- [ ] Use secure passwords (bcrypt)
- [ ] Enable JWT token expiration
- [ ] Regular security audits

## Support
For deployment issues:
1. Check provider documentation
2. Review backend logs
3. Verify environment variables
4. Test API endpoints locally
5. Contact provider support
