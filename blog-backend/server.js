require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes'); // Adjust the path based on your file structure
const blogRoutes = require('./routes/blogRoutes'); // Optional, for blog routes
const dashboard = require('./routes/dashboard'); // Optional, for blog routes

// Connect routes to the application
app.use('/', userRoutes);
app.use('/posts', blogRoutes); // Adjust if you have a different base path for blog routes
app.use('/dashboard', dashboard); // Adjust if you have a different base path for blog routes

// Database connection
mongoose.connect("mongodb+srv://anshumanrai180:anshuman@cluster0.akdybwr.mongodb.net/Blog_Web?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection error:', err));

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
