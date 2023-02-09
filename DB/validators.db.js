const Role = require('../models/role');
const usuario = require('../models/usuario');
const mongoose = require('mongoose');

    //Verificar si el rol existe
    const  esUnRolValido = async (rol = '')=>{
        const existeRol = await Role.findOne({ rol });
        if( !existeRol){
            throw new Error (`El rol ${rol} no esta registrado en la BD`);
        }
    }

    //Verificar si el correo existe
    const existeCorreo = async (correo) =>{
        const correoPresent = await usuario.findOne({correo});
        if (correoPresent){
            throw new Error (`El correo {${correo}} enviado ya esta registrado, por favor cambielo`);
         }
   }
    //Verificar si el id existe en la BD
    const existeID = async (id) =>{
        const ID = mongoose.Types.ObjectId(id);
        const idPresent = await usuario.findById(ID);  
        // console.log(`${id}-id <--> ${idPresent.id}`);
        if (id!==idPresent.id){
            throw new Error (`El ID {${id}} enviado no esta registrado, por favor envie uno ID valido`);
         }
   }
    

module.exports = {
    esUnRolValido,
    existeCorreo,
    existeID
}