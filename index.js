
// We will follow these steps:
// 1. Load environment variables using dotenv.
// 2. Import Express, HTTP server module, CORS middleware, database connection helper, and authentication routes.
// 3. Initialize the Express application, HTTP server instance, and port configuration.
// 4. Attach standard middleware (CORS and JSON body parser).
// 5. Mount API routes (e.g., authentication routes at '/api/auth').
// 6. Handle 404 (Not Found) errors for unhandled routes.
// 7. Define global error-handling middleware to catch uncaught errors and send appropriate HTTP response codes.
// 8. Define and invoke an asynchronous 'start' function to connect to MongoDB and start listening on the configured port.

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const passengerRoutes = require('./routes/passengerRoutes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// --- middleware ---
app.use(cors());
app.use(express.json());

// --- routes ---
app.use('/api/auth', authRoutes);
app.use('/api/passenger' , passengerRoutes);

// 404 Handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || (err.code === 'AUTH_INVALID_CREDENTIALS' ? 401 : 500);
    res.status(status).json({ error: err.message || 'Internal Server Error' });
});

async function start() {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start();