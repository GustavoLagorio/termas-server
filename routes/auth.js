/*
rutas de usuarios
host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken, tokenCliente } = require('../controllers/auth');


router.post(
    '/new',
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario)

router.post(
    '/',
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es incorrecto').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

router.get('/cliente', tokenCliente)

module.exports = router;