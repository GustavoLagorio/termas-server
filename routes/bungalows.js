/*
rutas de bungalows
host + /api/bungalows
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { crearBungalow, getBungalows, getBungalowById, actualizarBungalow } = require('../controllers/bungalows');

router.post(
    '/new',
    [ //middlewares
        check('id', 'El Id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('imagenes', 'Las imagenes son obligatorias').not().isEmpty(),
        check('galeria', 'La galeria es obligatoria').not().isEmpty(),
        check('comodidades', 'Las comodidades son obligatorias').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        validarJWT,
        validarCampos
    ],
    crearBungalow);

router.get('/', getBungalows);

router.get('/filtrar', getBungalowById)

router.put('/', actualizarBungalow)

module.exports = router;