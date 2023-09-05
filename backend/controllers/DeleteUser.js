// Import the User model.
const User = require("../models/user");

// Define a controller function for deleting a user.
const deleteUser = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters.

    try {
        // Attempt to delete the user with the specified ID from the database.
        const user = await User.deleteOne({ _id: userId });

        // Respond with a success message if the user is successfully deleted.
        res.status(200).json({ message: "User deleted" });

        // Check if the user document was found and deleted.
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        // Handle errors, such as validation errors or database errors.
        res.status(400).json(err.message);
    }
};

// Export the 'deleteUser' function for use in other parts of the application.
module.exports = { deleteUser };
