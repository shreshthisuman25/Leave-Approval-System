const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


// Load environment variables
dotenv.config();

const app = express();

// Session store
const store = new MongoDBStore({
  secret: process.env.SESSION_SECRET || 'leave-approval-system',
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/leave-approval-system',
  collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
  console.error('Session store error:', error);
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "client", "build")));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'leave-approval-system',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Routes
const authRouter = require("./routes/auth.js");
app.use('/api/auth', authRouter);

const userRouter = require("./routes/users.js");
app.use('/api/users', userRouter);

const leaveRouter = require("./routes/leave.js");
app.use('/api/leave', leaveRouter);

const departmentRouter = require("./routes/departments.js");
app.use('/api/departments', departmentRouter);

const instantLeaveRouter = require("./routes/instantLeave.js");
app.use('/api/leave/instant', instantLeaveRouter);

const googleRouter = require("./routes/google.js");
app.use('/api/google', googleRouter);

const appointmentsRouter = require("./routes/appointments.js");
app.use('/api/appointments', appointmentsRouter);

const medicalRouter = require("./routes/medical.js");
app.use('/api/leaves/medical', medicalRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Redirect all other requests to the index.html file
app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leave-approval-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
