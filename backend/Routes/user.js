// Import the required modules and dependencies.
const express = require("express");
const router = express.Router(); // Create an Express Router instance.

// Import controller functions for handling different routes.
const { register } = require('../controllers/Register'); // Import the register controller.
const { Login } = require("../controllers/Login"); // Import the login controller.
const { retrieveUsers } = require("../controllers/RetrieveUsers"); // Import the retrieveUsers controller.
const { deleteUser } = require("../controllers/DeleteUser")
const { updateUser } = require("../controllers/UpdateUser")

// Import the requireAuth middleware for authentication.
const { requireAuth } = require("../middlewares/requireAuth");

// Define route handlers and their associated controller functions and middleware.

// Route for user registration (POST /register).
router.post('/register', register);

// Route for user login (POST /login).
router.post("/login", Login);

// Route for retrieving users (GET /retrieveUsers) with authentication middleware.
router.get("/retrieveUsers", requireAuth, retrieveUsers);

// Route for updating user details (PUT / updateUser) with authentication middleware
router.put("/updateUser/:id", requireAuth , updateUser )

//Route for deleting user (DELETE / deleteUser) with authentication middleware
router.delete("/deleteUser/:id" ,requireAuth,  deleteUser)

// Export the router for use in the main Express application.
module.exports = router;
