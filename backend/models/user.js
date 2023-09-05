const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define a Mongoose schema for the user model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
        unique: true
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

// Define a pre-save middleware to hash the user's password
userSchema.pre("save", async function (next) {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt();

    // Hash the user's password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);

    // Continue with the save operation
    next();
});

// Create a Mongoose model named "User" based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of your application
module.exports = User;


