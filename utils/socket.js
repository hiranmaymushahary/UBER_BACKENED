const locationService = require('../services/locationService');

function initSocket(io) {

    io.on('connection', (socket) => {
        console.log(`New socket connected : ${socket.id}`);

        // Register driver with socket ID
        socket.on('registerDriver', async ({ driverId }) => {
            if (!driverId) return;
            await locationService.setDriverSocket(driverId, socket.id);
            console.log(`Driver ${driverId} registered with socket ID : ${socket.id}`);
        })
    });

    socket.on('disconnect', async({driverId}) => {
        if(!driverId) return;
        await locationService.deleteBySocket(socket.id);
        console.log(`Driver ${driverId} disconnected from socket : ${socket.id}`);
    })
}

module.exports = initSocket;