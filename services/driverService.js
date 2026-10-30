const locationService = require('../services/locationService')

const updateLocation = async(driverId , {latitude , longitude}) => {

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    try {
        const res = await locationService.addDriverLocation(driverId , lat , lon);
        // update driver location to redis
    } catch (error) {

        console.log(error);
        
    }
}

module.exports = {updateLocation};