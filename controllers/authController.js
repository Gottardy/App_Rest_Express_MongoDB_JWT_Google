const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const loginAuth = async (req = request, res = response) => {
    console.log('POST sended login');

    const {correo, password} = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'El usuario / password no son correctos - correo'
            });
        }

        // El usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'El usuario / password no son correctos - estado usuario'
            }); 
        }

        // Verificar la costraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg:'El usuario / password no son correctos - password'
            }); 
        }

        // Generar el Token JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg:'Login Ok',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Contacte al administrador, Login no Autorizado'
        });
    }
}

const loginGoogle = async (req = request, res = response) => {
    console.log('POST sended google login');
    const {id_token} = req.body;

    try {
        // Desestructuramos los parametros del usuario de la respuesta 
        const { nombre, imagen, correo} = await googleVerify( id_token);
        
        // verificar si el correo existe
        let usuario = await Usuario.findOne({correo});
        
        // console.log('resultado de la busqueda--> ',usuario)

        if (!usuario) {
            const data = { nombre, correo, password:':P', imagen, rol: 'USER_ROL', google: true };
            // console.log('la data--> ',data)
            usuario = new Usuario(data);
            // console.log('se creo el usuario: ',usuario)
            await usuario.save();
        }
        // El usuario esta activo o bloqueado
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Contacte al administrador, usuario bloqueado'
            }); 
        }

        // Generar el Token JWT
        // console.log(usuario.id)
        const tokenJWT = await generarJWT(usuario.id);
        
        res.json({
        //   msg: 'goolge token recibido - verificado',
        //   id_token,
        usuario,
        tokenJWT
        });
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'El Token no se pudo verificar'
        })
    }
}

module.exports = {
    loginAuth,
    loginGoogle
}