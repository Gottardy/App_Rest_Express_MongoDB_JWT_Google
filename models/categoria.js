 
const {Schema, model} = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatrio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio'],
    }
});

categoriaSchema.methods.toJSON = function(){
    const {__v, _id ,...categoria} = this.toObject();
    let uid = _id;
    let orderCategory = Object.assign({ uid }, categoria);
    return orderCategory;
}

module.exports = model('Categoria',categoriaSchema);