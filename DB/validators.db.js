const Role = require('../models/role');
const usuario = require('../models/usuario');
const categoria = require('../models/categoria');
const producto = require('../models/producto');
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
    //Verificar si el id categoria existe en la BD
    const existeIdCategoria = async (id) =>{
        const ID = mongoose.Types.ObjectId(id);
        const idPresent = await categoria.findById(ID);  
        // console.log(`${id}-id <--> ${idPresent.id}`);
        if (id!==idPresent.id){
            throw new Error (`El ID {${id}} enviado no esta registrado, por favor envie uno ID valido`);
         }
   }

    //Verificar si el id categoria existe en la BD
    const existeIdProducto = async (id) =>{
        const ID = mongoose.Types.ObjectId(id);
        const idPresent = await producto.findById(ID);  
        // console.log(`${id}-id <--> ${idPresent.id}`);
        if (id!==idPresent.id){
            throw new Error (`El ID {${id}} enviado no esta registrado, por favor envie uno ID valido`);
         }
   }

    // validar colecciones permitidas
    const coleccionesPermitidas = (coleccion ='', colecciones =[]) =>{
        const estaIncluida = colecciones.includes(coleccion)
        if (!estaIncluida) {
            throw new Error (`La colecion {${coleccion}} enviada no esta registrada en las colecciones {${colecciones}}`);
        }
        return true;
    }

module.exports = {
    esUnRolValido,
    existeCorreo,
    existeID,
    existeIdCategoria,
    existeIdProducto,
    coleccionesPermitidas
}