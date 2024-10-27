const jwt = require('jsonwebtoken');
const logger = require('../utils/logger'); 

const authVerificationMiddleware = (req, res, next) =>{
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        logger.info(`Token is Valid`);
        next();
    } catch (error) {
        logger.error(`Invalid Token : ${error.message}`);
        res.status(400).json({ error: 'Invalid Token' });
    }
}

module.exports = {
    authVerificationMiddleware
}
