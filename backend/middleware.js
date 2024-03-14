const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = decodeToken(token);

        if (!decoded || !decoded.userId) {
            throw new Error("Invalid token");
        }

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

// Function to decode JWT token
const decodeToken = (token) => {
    try {
        const [, payloadBase64] = token.split(".");
        const payloadJson = Buffer.from(payloadBase64, "base64").toString();
        return JSON.parse(payloadJson);
    } catch (err) {
        return null;
    }
};

module.exports = {
    authMiddleware
}
