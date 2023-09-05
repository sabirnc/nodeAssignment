// Load environment variables from a .env file.
require("dotenv").config();

// Import the Express.js framework.
const express = require("express");
const app = express();

// Import the Mongoose library for MongoDB interaction.
const mongoose = require("mongoose");

// Import user routes defined in the 'user' module.
const userRoutes = require("./Routes/user");

// Import the bodyParser middleware to parse JSON and URL-encoded data.
const bodyParser = require("body-parser");

// Configure Express to use the bodyParser middleware for JSON and URL-encoded data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for the 'user' module.
app.use("/user", userRoutes);

// Connect to the MongoDB database using Mongoose.
mongoose
  .connect(process.env.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the Express server using the port specified in the environment variables.
    app.listen(process.env.port, () => {
      console.log(`Server started on port ${process.env.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
