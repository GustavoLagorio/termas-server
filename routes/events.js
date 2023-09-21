/*
    Events Routes
    /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate')

const router = Router();

//Aplica de forma global en el archivo la funcion de validacion del JWT
router.use( validarJWT )


//Todas tienen que pasar por la validacion del JWT
//Obtener Eventos
router.get('/', getEventos);

//Crear un evento
router.post('/',
[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de salida es obligatoria').custom(isDate),
    validarCampos
],
crearEvento);

//Actualizar un evento
router.put('/:id', actualizarEvento)


//Actualizar un evento
router.delete('/:id', eliminarEvento)


module. exports = router