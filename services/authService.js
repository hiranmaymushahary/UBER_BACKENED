
// We will follow these steps:
// 1. Import necessary dependencies: 'jsonwebtoken' for JWT creation and 'userRepository' for user data operations.
// 2. Define a helper function 'signToken' that takes a user ID and generates a signed JWT containing token options (expiration, issuer, audience).
// 3. Define the 'register' service function to persist a new user via userRepo.create() and issue a JWT token.
// 4. Define the 'login' service function to find a user by email, compare password hashes, and throw an error if authentication fails.
// 5. Export register and login functions so they can be consumed by authController.js.

const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

function signToken(userId) {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
            issuer: process.env.JWT_ISSUER || 'uber-backend',
            audience: process.env.JWT_AUDIENCE || 'uber-clients'
        }
    );
}

async function register(userData) {
    const user = await userRepo.create(userData);
    const token = signToken(user._id.toString());
    return { user, token };
}

async function login({ email, password }) {
    const user = await userRepo.findByEmail(email);
    const ok = user && (await user.comparePassword(password));
    if (!ok) {
        throw new Error('Invalid email or password');
    }
    const token = signToken(user._id.toString());
    return { user, token };
}

module.exports = { register, login };