const { response } = require('express');
const Bungalow = require('../models/Bungalow');


const getBungalows = async (req, res = response) => {

    const bungalows = await Bungalow.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        bungalows
    })
};

const getBungalowById = async (req, res = response) => {

    const { id } = req.query;
    const bungalowId = parseInt(id)

    if (bungalowId) {

        try {
            const bungalow = await Bungalow.find({ id: bungalowId })
                .populate('user', 'name')

            res.json({
                ok: true,
                bungalow,

            })
        } catch (error) {

            console.error('Error al obtener bungalow:', error);
            res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener bungalow.'
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


const crearBungalow = async (req, res = response) => {

    const bungalow = new Bungalow(req.body)

    try {

        bungalow.user = req.uid

        const bungalowGuardado = await bungalow.save()

        res.json({
            ok: true,
            bungalow: bungalowGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}


const actualizarBungalow = async (req, res = response) => {

    const bungalowId = req.params.id;
    const uid = req.uid;

    try {

        const bungalow = await Bungalow.findById(bungalowId);

        if (!bungalow) {
            return res.status(404).json({
                ok: false,
                msg: 'bungalow no existe con ese id'
            })
        }

        if (bungalow.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso de editar el bungalow'
            })

        }

        const nuevoBungalow = {
            ...req.body,
            user: uid
        }

        const bungalowActualizado = await Bungalow.findByIdAndUpdate(bungalowId, nuevobungalow, { new: true });

        res.json({
            ok: true,
            bungalow: bungalowActualizado,
            msg: 'Bungalow actualizado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


// const eliminarEvento = async (req, res = response) => {

//     const eventoId = req.params.id;
//     const uid = req.uid;

//     try {

//         const evento = await Evento.findById(eventoId);

//         if (!evento) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'Evento no existe con ese id'
//             })
//         }

//         if (evento.user.toString() !== uid) {
//             return res.status(401).json({
//                 ok: false,
//                 msg: 'No tiene permiso para eliminar el evento'
//             })

//         }

//         const eventoActualizado = await Evento.findByIdAndDelete(eventoId);

//         res.json({
//             ok: true,
//             msg: 'Evento eliminado'
//         })


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         });
//     }
// }

module.exports = {
    getBungalows,
    getBungalowById,
    crearBungalow,
    actualizarBungalow
}