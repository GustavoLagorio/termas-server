const { Schema, model } = require("mongoose");

const BungalowSchema = Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenes: {
        type: Array,
        required: true
    },
    galeria: {
        type: Array,
        required: true
    },
    comodidades: {
        type: Array,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
   
});

BungalowSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id= _id;
    return object;
})

module.exports = model('Bungalow', BungalowSchema)