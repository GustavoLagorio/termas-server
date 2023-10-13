const { Schema, model } = require("mongoose");

const BungalowSchema = Schema({
    idBungalow: {
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
    galeria: {
        type: Array,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    comodidades: {
        type: Array,
        required: true
    },
    precio: [{
        
        ocupantes: {
            type: Number,
            required: true
        },

        costo: {
            type: Number,
            reqired: true
        }
    }],
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