const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yml')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Import routes
const courses = require('./routes/api/courses');
const students = require('./routes/api/students');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts')
const companies = require('./routes/api/companies');
const entrepreneurs = require('./routes/api/entrepreneur')
const teachers = require('./routes/api/teachers')

// DB Connection
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Use routes
app.use('/courses', courses);
app.use('/students', students);
app.use('/posts', posts)
app.use('/companies', companies);
app.use('/auth', users)
app.use('/entrepreneurs', entrepreneurs)
app.use('/teachers', teachers)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
