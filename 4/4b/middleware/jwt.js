const jwt = require('jsonwebtoken');
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ error: "Access denied, token missing!" })
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = payload.user;
        next()
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session timed out" })
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" })
        }
        return res.status(400).json({ error })
    }
}