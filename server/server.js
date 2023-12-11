const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/posts.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/blog', blogRoutes)

// Connection to database and start of server (MongoDB)
mongoose.connect('mongodb://localhost:27017/blog')
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

