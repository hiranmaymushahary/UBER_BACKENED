// We will follow these steps:
// 1. Import the authService module to handle business logic for registration and login.
// 2. Define the 'register' asynchronous controller function to process user sign-ups:
//    - Pass request body data to authService.register().
//    - Return a 201 Created status with response data (user, token) on success.
//    - Catch errors and respond with a 400 Bad Request status and error message.
// 3. Define the 'login' asynchronous controller function to process user authentication.
// 4. Export 'register' and 'login' functions so they can be attached to auth routes.

const authService = require('../services/authService');

const register = async (req, res, next) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).send({ data: { user, token }, success: true, error: null });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });
        
        // Response sent to the client
        res.status(200).send({ data: { user, token }, success: true, error: null });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { register, login };