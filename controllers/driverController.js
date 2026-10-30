const driverService = require('../services/driverService')


const updateLocation = async(req , res ) => {

    try {
        const {latitude , longitude} = req.body;

        if(typeof longitude != number || typeof latitude != number){
            throw new Error('Latitude and Longitude must be numbers');
        }

        driverService.updateLocation(req.user._id , {latitude , longitude});
        res.status(201).send({succes : true , error : null , message : "Location updated for driver"})
    } catch (error) {
        res.status(400).send({error : error.message});
    }

}

module.exports = {updateLocation};