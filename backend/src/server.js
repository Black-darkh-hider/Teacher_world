 const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import route files
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const jobRoutes = require('./routes/jobRoutes');
// Dev/debug routes
let debugRoutes = null
try {
  debugRoutes = require('./routes/debugRoutes')
} catch (e) {
  debugRoutes = null
}
const materialRoutes = require('./routes/materialRoutes');
const profileRoutes = require('./routes/profileRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const institutionTeamRoutes = require('./routes/institutionTeamRoutes');
const liveInterviewRoutes = require('./routes/liveInterviewRoutes');
const zoomRoutes = require('./routes/zoomRoutes');

// Register routes
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', jobRoutes);
if (process.env.NODE_ENV !== 'production' && debugRoutes) {
  app.use('/api/debug', debugRoutes)
}
app.use('/api/materials', materialRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/institutions', institutionRoutes);
app.use("/api/institution/teams", require("./routes/institutionTeamRoutes")); // example
// OR if you mounted at /institution/teams, match the frontend URL exactly
app.use('/api/live-interview', liveInterviewRoutes);
app.use('/api/zoom', zoomRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
