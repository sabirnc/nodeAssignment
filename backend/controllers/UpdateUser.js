// Import the User model.
const User = require("../models/user");

// Define a controller function for updating user details.
const updateUser = async (req, res) => {
  const userId = req.params.userId; // Get the user ID from the request parameters.
  const updatedUserData = req.body; // Get the updated user data from the request body.

  try {
    // Use the Mongoose model to update the user details in the database.
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true, // Return the updated user data.
      runValidators: true, // Run validation checks on the updated data.
    });

    if (!updatedUser) {
      // Handle the case where the user is not found.
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user data.
    res.status(200).json(updatedUser);
  } catch (err) {
    // Handle errors, such as validation errors or database errors.
    res.status(400).json(err.message);
  }
};

// Export the 'updateUser' function for use in other parts of the application.
module.exports = { updateUser };
