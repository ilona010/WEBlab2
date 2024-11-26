const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretKey';

const authMiddleware = (roles = []) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).send('Forbidden');
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
};

module.exports = authMiddleware;
