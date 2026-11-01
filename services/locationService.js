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
    async findNearbyDrivers(longitude , latitude , radiusKm){
        const nearbyDrivers = await redisClient.sendCommand([
            'GEORADIUS',
            'drivers',
            longitude.toString(),
            latitude.toString(),
            radiusKm.toString(),
            'km',
            'WITHCOORD',
        ])
        return nearbyDrivers;
    }
    async setDriverSocket(driverId , socketId){
        await redisClient.set(`driver:${driverId}`, socketId);
    }

    async getDriverSocket(driverId){
        return await redisClient.get(`driver:${driverId}`);
    }
    async deleteDriverSocket(driverId){
        await redisClient.del(`driver:${driverId}`);
    }

    async deleteBySocket(socketId){
        const driverId = await redisClient.get(`socket:${socketId}`);
        if(driverId){
            await redisClient.del(`driver:${driverId}`);
            await redisClient.del(`socket:${socketId}`);
        }
    }
}

module.exports = new locationService();


