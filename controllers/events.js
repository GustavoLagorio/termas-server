const { response } = require('express');
const Evento = require('../models/Evento')


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        eventos
    })
};

const getClientes = async (req, res = response) => {
    try {
        const clientes = await Evento.distinct('documento', {
            // Puedes agregar más condiciones de filtrado aquí si es necesario
        });

        // Ahora, para cada email único, obtén el primer documento correspondiente
        const reservas = await Promise.all(clientes.map(async (documento) => {
            const reserva = await Evento.findOne({ documento }, 'nombre apellido telefono');
            return reserva;
        }));

        res.json({
            ok: true,
            clientes: reservas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'Error al obtener los datos del cliente'
        });
    }
};

const getEventosByBungalowId = async (req, res = response) => {

    const { idBungalow } = req.query;

    if (idBungalow) {
        
        try {
            const eventos = await Evento.find({ idBungalow: idBungalow })
                .populate('user', 'name')

            res.json({
                ok: true,
                eventos,

            })
        } catch (error) {

            console.error('Error al obtener eventos:', error);
            res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener eventos.'
            });

        }


    } else {

        return res.status(400).json({
            ok: false,
            mensaje: 'El ID del bungalow es requerido en la consulta.',
            log: console.log(bungalow)
        });
    }
};


const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body)
    console.log(req.body);

    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })

        console.log(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de editar el evento'
            })

        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado,
            msg: 'Evento actualizado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar el evento'
            })

        }

        const eventoActualizado = await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    getClientes,
    getEventosByBungalowId,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}