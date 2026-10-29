
// We will follow these steps:
// 1. Import the User Mongoose model from '../models/user'.
// 2. Define the 'create' asynchronous function to instantiate a new User model with provided userData, save it to the database, and return the created document.
// 3. Define the 'findByEmail' asynchronous function to query the database for a user matching a given email address using User.findOne().
// 4. Export 'create' and 'findByEmail' so they can be consumed by the auth service layer.

const User = require('../models/user');

async function create(userData) {
    const user = new User(userData);
    await user.save();
    return user;
}

async function findByEmail(email) {
    return User.findOne({ email });
}

module.exports = { create, findByEmail };