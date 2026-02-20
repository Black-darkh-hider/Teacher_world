# Deploy to GitHub & Production

## Push to GitHub

### 1. Initialize Git (if not done)
\`\`\`bash
git init
git add .
git commit -m "Initial commit: TeacherWorld job portal"
\`\`\`

### 2. Create GitHub Repository
- Go to github.com
- Create new repository "teacher-portal"
- Copy repo URL

### 3. Push Code
\`\`\`bash
git remote add origin https://github.com/yourname/teacher-portal.git
git branch -M main
git push -u origin main
\`\`\`

## Production Deployment

### Deploy Backend to Render.com

1. **Create Account** at render.com
2. **Connect GitHub** - Link your GitHub account
3. **Create Web Service**
   - Select repository
   - Branch: main
   - Root directory: backend
   - Build command: `npm install`
   - Start command: `npm run dev` (or use `node server.js`)
   - Environment: Add all .env variables

4. **MongoDB Atlas Setup**
   - Create cluster at mongodb.com/cloud
   - Get connection string
   - Add to Render environment variables as MONGODB_URI

5. **Deploy** - Click Deploy
6. **Get URL** - Render provides public URL (e.g., https://teacherworld-backend.onrender.com)

### Deploy Frontend to Vercel

1. **Connect GitHub** at vercel.com
2. **Import Project**
   - Select repository
   - Select frontend folder
3. **Configure Environment**
   - VITE_API_URL = https://teacherworld-backend.onrender.com/api (backend URL)
4. **Deploy** - Click Deploy
5. **Get URL** - Vercel provides domain (e.g., https://teacherworld-frontend.vercel.app)

### Update Backend CORS

Update backend .env on Render:
\`\`\`
FRONTEND_URL=https://teacherworld-frontend.vercel.app
\`\`\`

Redeploy backend.

## Domain Setup

### Add Custom Domain

**Backend (Render):**
1. Go to Service Settings
2. Add custom domain (e.g., api.teacherworld.com)
3. Follow DNS setup instructions

**Frontend (Vercel):**
1. Go to Project Settings
2. Add custom domain (e.g., teacherworld.com)
3. Update DNS records

### SSL Certificate

- Render: Automatic with Let's Encrypt
- Vercel: Automatic with Let's Encrypt
- No additional steps needed

## Monitoring

### Backend Logs (Render)
- Logs tab shows real-time logs
- Set up alerts for errors

### Frontend (Vercel)
- Analytics tab for performance
- Error reports in dashboard

## Maintenance

### Update Code

\`\`\`bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main
\`\`\`

Both Render and Vercel automatically redeploy on push!

### Scale Database

If traffic increases:
- Upgrade MongoDB Atlas cluster
- Add indexes to MongoDB collections
- Enable caching with Redis

### Enable CDN

- Frontend: Vercel CDN (automatic)
- Backend: Add Cloudflare for caching

## Production Checklist

- [ ] Environment variables set correctly
- [ ] Database backup enabled
- [ ] Email service configured
- [ ] SSL certificates active
- [ ] CORS configured for production URLs
- [ ] Monitoring/logging enabled
- [ ] Error tracking (Sentry) setup
- [ ] Rate limiting implemented
- [ ] Security headers added
- [ ] Database indexes created

## Cost Estimate

**Free Tier:**
- Render: Web service included free tier
- Vercel: Hobby plan free
- MongoDB Atlas: 512MB free
- Total: $0 (with limitations)

**Paid Plans:**
- Render: $7/month for web service
- Vercel: $20/month pro
- MongoDB Atlas: $57/month (M10)
- Total: ~$84/month

You can start free and upgrade as needed!

## Troubleshooting Production

### Blank Page on Frontend
- Check VITE_API_URL in Vercel environment
- Check browser console for errors
- Ensure backend is running

### API 502 Error
- Check backend logs on Render
- Verify MongoDB connection
- Check environment variables

### Email not sending
- Verify SMTP credentials
- Check Gmail App Password
- Look at backend logs for email errors

### Slow response
- Check database indexes
- Look for N+1 queries
- Add caching layer

## Next Steps

After deployment:
1. Set up monitoring (Sentry, NewRelic)
2. Enable analytics (Google Analytics, Mixpanel)
3. Setup auto backups for MongoDB
4. Configure email alerts
5. Plan SEO optimization
6. Setup custom domain emails
