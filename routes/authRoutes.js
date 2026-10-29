
// We will follow these steps:
// 1. Import Express to access its routing capabilities.
// 2. Destructure and import the register and login controller handlers from authController.js.
// 3. Initialize an Express Router instance.
// 4. Map the HTTP POST request for '/register' to the register controller.
// 5. Map the HTTP POST request for '/login' to the login controller.
// 6. Export the configured router so it can be mounted in the main application file (e.g., index.js).

const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;