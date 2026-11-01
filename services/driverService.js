const locationService = require('../services/locationService')

const updateLocation = async(driverId , {latitude , longitude}) => {

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    try {
        // update driver location in redis
        const res = await locationService.addDriverLocation(driverId , lat , lon);
        // update driver location in mongo
        await userRepository.updateLocation(driverId , {
            type : 'Point',
            coordinates : [lon , lat]
        });
    } catch (error) {

        console.log(error);
        
    }
}

module.exports = {updateLocation};