
// We will follow these steps:
// 1. Import 'mongoose' to enable connection and management with MongoDB.
// 2. Define the 'connectDB' asynchronous function to establish the connection:
//    - Attempt connection using process.env.MONGO_URI and configuration flags (useNewUrlParser, useUnifiedTopology).
//    - Log a success message ('MongoDB connected') once connected.
//    - Catch connection errors, log the failure details, and terminate the process (process.exit(1)).
// 3. Export 'connectDB' so it can be called during application startup (e.g., in index.js).



const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

module.exports = { connectDB };