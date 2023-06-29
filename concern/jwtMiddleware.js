const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
    const token = req.headers['x-access-token']

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'error',
                message: 'Jwt was expired'
            });
        }
        req.user = decoded;
        next();
    })
}

module.exports = authJWT;