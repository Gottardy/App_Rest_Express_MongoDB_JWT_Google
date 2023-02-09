const { response, request } = require('express');
const JWT = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req=request, res=response, next )=>{
    // Validar que el token esta presente en el head
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'Peticion no validada correctamente : Token no presente'
        });
    }
    
    try {
        // validar el token es un token JWT valido 
        const { uid } = JWT.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // validar si existe un usuario en la bd que genero ese token
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario : No existe BD'
            });
        }
        // validar si el estado del usuario en la bd que genero ese token esta activo
        const {id, nombre, rol, estado, ...restoDatos} = usuario;
        if (!estado) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario Estado : No permitido'
            });
        }

        req.usuarioAutenticado = {id, nombre, rol};

        next();
    } catch (error) {
        console.log('Error-JWT: '+error);
        res.status(401).json({
            msg: 'Peticion no validada correctamente - '+error
        })
    }
}

module.exports={
    validarJWT,
}