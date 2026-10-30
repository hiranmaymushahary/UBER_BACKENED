const {redisClient} = require('../utils/redisClient');

class locationService {

    async addDriverLocation(driverId , longitude , latitude){

        try {
            await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                latitude.toString(),
                longitude.toString(),
                driverId.toString(),

            ])
        } catch (error) {
            console.log("Cannot add to redis ", error);
        }
    }

}

module.exports = new locationService();