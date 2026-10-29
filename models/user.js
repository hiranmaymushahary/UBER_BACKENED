// We will follow these steps:
// 1. Import necessary libraries (Mongoose for database interactions, Bcrypt for password hashing).
// 2. Define the user schema structure (fields for name, unique email, password, role, and location coordinates).
// 3. Add a pre-save hook to hash the plain text password before saving it to the database.
// 4. Create an instance method to compare candidate passwords during login.
// 5. Compile and export the Mongoose model for use across the application.

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['driver', 'passenger'] },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    }
});

// Fixed: Async hooks in Mongoose should NOT accept or call next()
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;