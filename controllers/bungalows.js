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

    const { idBungalow } = req.params;
    const bungalowId = parseInt(idBungalow);

    if (bungalowId) {

        try {
            const bungalow = await Bungalow.find({ idBungalow: bungalowId })
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

    const { idBungalow } = req.params;
    const bungalowId = parseInt(idBungalow);
    const uid = req.uid;
    console.log(req.body);

    try {

        const bungalow = await Bungalow.findOneAndUpdate(
            { idBungalow: bungalowId },
            { ...req.body, user: uid }, // Actualiza los datos del bungalow con los datos del cuerpo de la solicitud y el usuario (uid)
            { new: true }
        );

        if (!bungalow) {
            return res.status(404).json({
                ok: false,
                msg: 'bungalow no existe con ese id'
            })
        }

        /*const nuevoBungalow = {
            ...req.body,
            user: uid
        }

        const bungalowActualizado = await Bungalow.findOneAndUpdate({ idBungalow: bungalowId }, nuevoBungalow, { new: true });*/

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

module.exports = {
    getBungalows,
    getBungalowById,
    crearBungalow,
    actualizarBungalow
}