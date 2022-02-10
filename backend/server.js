const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config(); // Allows us to have our .env files with our variables in it.
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000; // Allows us to access the PORT number in our .env file or the other port number that we've set.

connectDB(); // Connects to the database

const app = express(); // Initializes express for the API build

app.use(express.json()); // Middleware - bodyparser - allow you to send body data.  Test using Postman.
app.use(express.urlencoded({ extended: false })); // Middleware - allows you to send urlencoded data.  Test using Postman.

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
