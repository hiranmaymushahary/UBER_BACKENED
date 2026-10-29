const bookingService = require('../services/bookingService');

const createBooking = async(req , res) => {


    try {
        console.log(req.body);
        const{source , destination} = req.body;
        // Create a booking > persist a booking object in mongodb

       const booking= await bookingService.createBooking({passengerId : req.user._id , source , destination})


        // find nearby driver > redisdb

        // notify narby drivers
        res.status(201).send({data : booking , success : true , error : null , message : "Succesfully created the booking"});
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {createBooking};