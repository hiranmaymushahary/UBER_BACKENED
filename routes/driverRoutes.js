// Routes to get previous bookings
// router.get('/bookings' , getDriverBokkings)

// Routes to get update driver location
// router.post('/location' , update location)


const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {updateLocation} = require('../controllers/driverController');
const router = express.Router();

router.post('/location' , updateLocation);


module.exports = router;