const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
require('dotenv').config();

const app = express();

app.use(express.json());

// Import routes
const courses = require('./routes/api/courses');
const students = require('./routes/api/students');
const users = require('./routes/api/users');


// DB Connection
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Use routes
app.use('/courses', courses);
app.use('/students', students);
app.use('/auth', users)

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
