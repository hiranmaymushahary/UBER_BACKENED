
// We will follow these steps:
// 1. Import 'jsonwebtoken' to verify JWT tokens sent by clients.
// 2. Define 'authenticateToken' to extract and verify the authorization header:
//    - Read the Bearer token from the 'Authorization' header.
//    - Return a 401 Unauthorized status if no token is provided.
//    - Verify the token using process.env.JWT_SECRET.
//    - Attach decoded user details (e.g., id, role) to 'req.user' and proceed with next().
//    - Return a 403 Forbidden status if token verification fails.
// 3. Define 'authorizeRoles' to restrict route access based on user roles (e.g., ['driver'], ['passenger']):
//    - Check if 'req.user.role' matches allowed roles.
//    - Return a 403 Forbidden status if unauthorized.

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = decodedUser;
        next();
    });
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: insufficient permissions' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};