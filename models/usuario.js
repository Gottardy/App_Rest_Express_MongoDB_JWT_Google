
const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatrio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

usuarioSchema.methods.toJSON = function(){
    const {__v, password, _id ,...usuario} = this.toObject();
    let uid = _id;
    let orderUser = Object.assign({ uid }, usuario);
    return orderUser;

}

module.exports = model('Usuario',usuarioSchema);