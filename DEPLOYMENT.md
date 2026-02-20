# Deployment Guide

## Local Development

Both frontend and backend run locally. See QUICK_START.md

## Production Deployment

### Backend (Node.js + Express)

**Option 1: Render.com**
1. Push to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Set environment variables
5. Deploy

**Option 2: Railway.app**
1. Connect GitHub
2. Add environment variables
3. Deploy automatically

**Option 3: AWS/Azure/Heroku**
Follow their Node.js deployment guides

### Frontend (React + Vite)

**Option 1: Vercel**
1. Connect GitHub
2. Select frontend folder
3. Set `VITE_API_URL` to production backend
4. Deploy

**Option 2: Netlify**
1. Connect GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

**Option 3: AWS S3 + CloudFront**
1. Build: `npm run build`
2. Upload `dist` folder to S3
3. Configure CloudFront CDN

### Database (MongoDB)

Use MongoDB Atlas (cloud):
1. Create account at mongodb.com/cloud
2. Create cluster
3. Get connection string
4. Update backend .env with production URI

### Email Service

Gmail works for low volume. For production:
- SendGrid (recommended)
- Mailgun
- AWS SES

Update backend config/mailer.js accordingly.

---

### Environment Variables for Production

Backend:
\`\`\`env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...atlas connection string
JWT_SECRET=very-strong-random-secret
SMTP_USER=sendgrid_or_other@example.com
FRONTEND_URL=https://yourdomain.com
\`\`\`

Frontend:
\`\`\`env
VITE_API_URL=https://your-backend-domain.com/api
\`\`\`

### SSL Certificate

Use Let's Encrypt (free):
- Render/Vercel/Netlify handle it automatically
- For custom domain, use Certbot

### Domain Setup

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Point DNS to hosting provider
3. Update FRONTEND_URL and CORS in backend
4. Get SSL certificate

### Monitoring & Logging

- Use Sentry for error tracking
- Use LogRocket for session replay
- Monitor API performance with New Relic
- Set up uptime monitoring with UptimeRobot
