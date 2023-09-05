// Import the User model, likely representing the user schema and database interactions.
const User = require("../models/user");

// Initialize an error object to store validation and registration error messages.
const error = {
  name: null,
  password: null,
  mobile: null,
  email: null,
};

// Define a function to handle registration-related errors.
const handleRegisterError = (err) => {
  if (err.message.includes("users validation failed")) {
    // Handle validation errors by extracting and updating specific error messages.
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
    return error;
  }

  if (err.code === 11000) {
    // Handle duplicate key errors (e.g., unique fields like name, email, or mobile).
    if (err.keyPattern.hasOwnProperty('name')) {
      error.name = "This name is already taken";
    } else if (err.keyPattern.hasOwnProperty('email')) {
      error.email = "This email is already taken";
    } else if (err.keyPattern.hasOwnProperty('mobile')) {
      error.mobile = "This mobile number is already taken";
    }
    return error;
  }
};

// Define a route handler for user registration.
const register = async (req, res) => {
  const { name, password, mobile, email } = req.body;

  try {
    // Attempt to create a new user document in the database.
    const user = await User.create({
      name,
      password,
      mobile,
      email,
    });

    // Send a success response with the user data and a 200 status code.
    res.status(200).json(user);
  } catch (err) {
    // If an error occurs during user creation, handle it and send an error response.
    const error = handleRegisterError(err);
    res.status(400).json(error);
  }
};

// Export the 'register' function for use in other parts of the application.
module.exports = { register };

