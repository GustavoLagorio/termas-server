const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    bungalow: {
        type: String,
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    documento: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
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