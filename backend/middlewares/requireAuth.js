// Import the jsonwebtoken module.
const jwt = require("jsonwebtoken");

// Define a middleware function for requiring authentication.
const requireAuth = (req, res, next) => {
    const { authorization } = req.headers; // Get the 'authorization' header from the request.

    // Check if the 'authorization' header is missing.
    if (!authorization) {
        return res.status(401).json({ error: "Authorization required" });
    }

    // Extract the token from the 'authorization' header (assuming the header is in the format "Bearer <token>").
    const token = authorization.split(" ")[1];

    try {
        // Verify the token using the secret key defined in process.env.secret.
        const user = jwt.verify(token, process.env.secret);

        // If the token is successfully verified, call the next middleware or route handler.
        next();
    } catch (err) {
        // Handle JWT verification errors (e.g., token expiration or invalid token).
        res.status(400).json(err.message);
    }
};

// Export the 'requireAuth' middleware function for use in other parts of the application.
module.exports = { requireAuth };
