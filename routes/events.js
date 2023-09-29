/*
    Events Routes
    /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearReserva, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate')

const router = Router();

//Aplica de forma global en el archivo la funcion de validacion del JWT
router.use( validarJWT )


//Todas tienen que pasar por la validacion del JWT
//Obtener Eventos
router.get('/', getEventos);

//Crear un reserva
router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de salida es obligatoria').custom(isDate),
    validarCampos
],
crearReserva);

//Actualizar un evento
router.put('/:id', actualizarEvento)


//Actualizar un evento
router.delete('/:id', eliminarEvento)


module. exports = router