const jwt = require('jsonwebtoken');

const generarTokenCliente = () => {
    return jwt.sign({}, process.env.SECRET_JWT_SEED, { expiresIn: '1h' });
};

module.exports = {
    generarTokenCliente
}