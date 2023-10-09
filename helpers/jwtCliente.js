const jwt = require('jsonwebtoken');

const generarTokenCliente = (payload) => {
    return jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '1h' });
};

module.exports = {
    generarTokenCliente
}