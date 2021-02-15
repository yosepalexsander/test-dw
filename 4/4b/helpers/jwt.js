const jwt = require('jsonwebtoken');



exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 })
};

exports.generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}