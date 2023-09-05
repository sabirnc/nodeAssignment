// Import the User model.
const User = require("../models/user");

// Define a controller function for retrieving users.
const retrieveUsers = async (req, res) => {
    try {
        // Use the Mongoose model to retrieve all user documents from the database.
        const users = await User.find({});

        // Respond with the retrieved users in JSON format.
        res.status(200).json(users);
    } catch (err) {
        // Handle any errors that occur during the retrieval process.
        console.log(err); // Log the error for debugging purposes.

        // Send a generic error response (you may want to handle this differently).
        res.status(500).json({ message: "An error occurred while retrieving users" });
    }
};

// Export the 'retrieveUsers' function for use in other parts of the application.
module.exports = { retrieveUsers };
