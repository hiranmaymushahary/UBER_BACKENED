const bookingService = require('../services/bookingService');

const createBooking = async(req , res) => {


    try {
        console.log(req.body);
        const{source , destination} = req.body;
        // Create a booking > persist a booking object in mongodb

       const booking= await bookingService.createBooking({passengerId : req.user._id , source , destination})

        // find nearby driver > redisdb

        // notify narby drivers
    } catch (error) {
        
    }
}

module.exports = {createBooking};