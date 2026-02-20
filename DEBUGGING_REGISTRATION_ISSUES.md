# Registration Troubleshooting Guide

## Issue: "Registration Failed" Error

### Step 1: Check Backend Console Logs
When you try to register, look at your backend terminal where you ran `npm start`.

**You should see logs like:**
\`\`\`
[REGISTRATION] Teacher registration attempt: { email: 'user@gmail.com', name: 'John Doe' }
[REGISTRATION] Generated OTP: 123456 for email: user@gmail.com
[REGISTRATION] OTP saved to database
[MAILER] Email sent successfully to: user@gmail.com
\`\`\`

**If you DON'T see these logs, check the following:**

---

## Common Issues & Solutions

### Problem 1: `MONGODB_URI` is not set
**Error in backend console:**
\`\`\`
MongoDB connection error: [Error details about connection]
\`\`\`

**Solution:**
1. Open `backend/.env`
2. Add this line:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/job-portal
   \`\`\`
3. Make sure MongoDB is running
   - Windows: Check Services for MongoDB
   - Mac: Run `brew services start mongodb-community`
   - Linux: Run `sudo systemctl start mongod`
4. Restart backend with `npm start`

---

### Problem 2: Gmail credentials not working
**Error in backend console:**
\`\`\`
[MAILER] Gmail credentials not configured in environment variables
or
[MAILER] Error sending email: Invalid login - 535-5.7.8 Username and password not accepted
\`\`\`

**Solution:**
1. DO NOT use your actual Gmail password
2. Use an App-Specific Password instead:
   - Go to https://myaccount.google.com/apppasswords
   - **Must have 2FA enabled first** - Go to Security settings if you don't
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
   - In `backend/.env`, update:
     \`\`\`
     GMAIL_USER=your-email@gmail.com
     GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
     \`\`\`
3. Restart backend

**Can't access App Passwords?**
- Alternative: Enable "Less secure app access"
  - Go to https://myaccount.google.com/lesssecureapps
  - Turn it ON (if available in your region)
  - Use your actual Gmail password then

---

### Problem 3: Frontend can't reach backend
**Error in browser console (F12 → Console tab):**
\`\`\`
AxiosError: Network Error
or
Failed to connect to http://localhost:5000/api
\`\`\`

**Solution:**
1. Make sure backend is running (should see "Server running on port 5000")
2. Check `frontend/.env`:
   \`\`\`
   VITE_API_URL=http://localhost:5000/api
   \`\`\`
3. Backend and frontend must use same port 5000 and 5173
4. If ports are different, update `.env` files accordingly

---

### Problem 4: "All fields required" error
**In browser, you see:** "All fields are required"

**Solution:**
1. This means one of the required fields is empty
2. Check that you filled in:
   - Full Name
   - Email Address
   - Password (at least 6 characters)
   - Confirm Password (must match)
3. Make sure confirm password matches exactly

---

### Problem 5: OTP not arriving in email
**You got "OTP sent" message, but no email in inbox**

**Solution:**
1. **Check SPAM folder** - Emails often go there
2. **Wait 5-10 seconds** - Gmail can be slow
3. **Check username in email** - Make sure it's your correct Gmail
4. **Verify Gmail credentials** - Check backend console logs for:
   - `[MAILER] Email sent successfully to: your-email`
   - If you don't see this, go to Problem 2 above

---

### Problem 6: "Invalid OTP" error when entering OTP
**You see:** "Invalid OTP. Please check and try again."

**Solution:**
1. Check you copied the OTP correctly from the email
2. OTP is valid for 10 minutes only - if it's been longer, go back and register again
3. Make sure no extra spaces before/after OTP when pasting
4. OTP should be exactly 6 digits

---

### Problem 7: "Email already registered"
**You see:** "Email already registered. Please login instead."

**Solution:**
1. This account was already registered before
2. Use **Login** button instead
3. Or use a different email address for new registration

---

## Debug Steps - Do This First

### Step 1: Check Backend Status
Open your backend terminal and verify you see:
\`\`\`
MongoDB connected
Server running on port 5000
\`\`\`

If not:
- MongoDB not connected? Install and start MongoDB
- Backend not starting? Run `npm install` first

### Step 2: Test Backend API
Open your browser and visit:
\`\`\`
http://localhost:5000/api/health
\`\`\`

You should see:
\`\`\`json
{"status":"OK"}
\`\`\`

If you see error, backend isn't running correctly.

### Step 3: Check Environment Variables
Backend terminal should show on startup:
\`\`\`
[Environment] Loaded configuration...
\`\`\`

Run this command in `backend` folder to verify:
\`\`\`bash
cat .env
\`\`\`

Should show all variables including GMAIL_USER, GMAIL_PASSWORD, MONGODB_URI

### Step 4: Enable Frontend Debug Logs
Open browser Console (F12) and look for blue log messages:
\`\`\`
[RegisterTeacher] API URL: http://localhost:5000/api
[RegisterTeacher] Sending registration request...
[RegisterTeacher] Registration successful: { message: "OTP sent..." }
\`\`\`

These logs help track exactly where the issue is.

---

## Full Debug Checklist

Before registering, verify:

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] `.env` file exists in backend folder
- [ ] `GMAIL_USER` is set (your Gmail)
- [ ] `GMAIL_PASSWORD` is app-specific password
- [ ] `MONGODB_URI` is set correctly
- [ ] Frontend running on port 5173
- [ ] `frontend/.env` has `VITE_API_URL=http://localhost:5000/api`
- [ ] Can access http://localhost:5000/api/health
- [ ] Browser Console shows no red errors
- [ ] Backend console shows registration logs

---

## If Still Not Working

**Collect this information and provide it:**

1. Full error message from browser Console (F12)
2. Backend console logs during registration attempt
3. Your `.env` file (redact password)
4. Exact steps you took before getting the error

---

## Test Registration Flow

### Quick Test
1. Use a test email (your Gmail or temp email)
2. Full Name: `Test User`
3. Email: `your-email@gmail.com`
4. Password: `Test123456`
5. Confirm: `Test123456`
6. Click "Continue"
7. Check email for OTP (wait 5 seconds, check spam)
8. Enter 6-digit OTP
9. Click "Verify & Complete"

If this works, registration system is functional!

---

## Production Notes

When going live:
1. Change all secrets in `.env`
2. Use strong JWT secrets (32+ characters)
3. Update FRONTEND_URL to production domain
4. Use production MongoDB (MongoDB Atlas)
5. Use production Gmail account or email service
6. Enable HTTPS everywhere
7. Add VITE_API_URL for production frontend
