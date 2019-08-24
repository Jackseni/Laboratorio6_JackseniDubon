const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./config');

exports.ensureAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Error" })
    }
    let token = req.headers.authorization.split(" ")[1]
    let payload = jwt.decode(token, config.TOKEN_SECRET)

    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: "El token ha expirado" })
    }

    req.user = payload.sub
    next()
}