const { JWT_SECRET } = require("./config");
let jwt;
// Check if running in Node.js environment
if (typeof window === 'undefined') {
    jwt = require("jsonwebtoken");
} else {
    // If running in browser environment, use a browser-compatible JWT library or handle authentication differently.
    // You might need to implement a different authentication mechanism for client-side code.
    throw new Error("JWT authentication is not supported in browser environment");
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}
