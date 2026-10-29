
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

function signToken(userId) {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
            issuer: process.env.JWT_ISSUER || 'uber-backend',
            audience: process.env.JWT_AUDIENCE || 'uber-clients'
        }
    );
}

async function register(userData) {
    const user = await userRepo.create(userData);

    const token = signToken(user._id.toString());

    const userObject = user.toObject
        ? user.toObject()
        : { ...user };

    delete userObject.password;
    delete userObject.token;

    return { user: userObject, token };
}

async function login({ email, password }) {
    const user = await userRepo.findByEmail(email);

    const ok = user && (await user.comparePassword(password));

    if (!ok) {
        throw new Error('Invalid email or password');
    }

    const token = signToken(user._id.toString());

    const userObject = user.toObject
        ? user.toObject()
        : { ...user };

    delete userObject.password;
    delete userObject.token;

    return { user: userObject, token };
}

module.exports = { register, login };
