// Import necessary modules and dependencies.
const User = require("../models/user"); // Import the User model.
const bcrypt = require("bcrypt"); // Import bcrypt for password comparison.
const jwt = require("jsonwebtoken"); // Import JWT for token creation.

// Define a function to create a JWT token based on a user object.
const createToken = (user) => {
    const payload = { id: user._id }; // Create a payload with the user's ID.
    const token = jwt.sign(payload, process.env.secret); // Sign the payload with the secret key.
    return token; // Return the generated token.
}

// Define a route handler for user login.
const Login = async (req, res) => {
    const { name, password } = req.body; // Get the username and password from the request body.

    try {
        const user = await User.findOne({ name: name }); // Find a user with the specified username in the database.

        if (user) {
            const auth = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database.

            if (auth) {
                const token = createToken(user); // Create a JWT token for the authenticated user.
                return res.status(200).json({ token }); // Send the token in the response.
            }

            throw Error("Incorrect password"); // Throw an error if the password is incorrect.
        }

        throw Error("Username is invalid"); // Throw an error if the username is not found in the database.
    } catch (err) {
        res.status(400).json(err.message); // Handle and respond with the error message in case of any errors.
    }
}

// Export the 'Login' function for use in other parts of the application.
module.exports = { Login };
