const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endEnd: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
   
});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id= _id;
    return object;
})

module.exports = model('Evento', EventoSchema)