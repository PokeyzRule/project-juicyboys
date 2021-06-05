const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const users = require('./routes/api/users');


// DB Connection
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.use('/users', users)

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));