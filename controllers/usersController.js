const { request, response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');

const usersGet = async (req = request, res = response) => {
  console.log('GET sended');
    // Desesctruturando el query de los parametros 
    // Creamos la solicitud de Paginacion de resultados con usuarios con estado 'true'
    const {pag = 5, rang = 0} = req.query;
    const query = {estado: true};

    const [totalRegistrosBD, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      await Usuario.find( query )
        .skip(Number(rang))
        .limit(Number(pag))
    ])
    const totalRegistrosConsultados =  Object.keys(usuarios).length;

    res.json({
    // msg: 'get API - Controller',
    totalRegistrosBD,
    totalRegistrosConsultados,
    usuarios
    });
}

const usersPut = async (req = request, res = response) => {
  console.log('PUT sended');
    // Recibiendo el parametro 'id' de la ruta y utilizandolo
    const id = req.params.id;

    // Desesctruturando el query de los parametros del body
    const { password, google, correo, ...restoDatos} = req.body;

    // Encriptar de nuevo la nueva contraseña 
    if (password) {
      const salt = bcrypt.genSaltSync(12);
      restoDatos.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, restoDatos);

    res.json({
    // msg: 'put API - Controller',
    usuario
  });
}

const usersPost = async (req, res = response) => {
  console.log('POST sended');
    // Desesctruturando el body
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(12);
    usuario.password = await bcrypt.hashSync(password, salt);

    // Guardar en la BD
    await usuario.save();

    res.json({
      // msg: 'post API - Controller POST',
      usuario
    });
  }

const usersDelete = async (req, res = response) => {
  console.log('DELETED sended');
  // Recibiendo el parametro 'id' de la ruta y utilizandolo
  const id = req.params.id;
  const usuarioAutenticado = req.usuarioAutenticado;

  //id Logicamente borrado de la BD, actualizando el estado a false
  const usuarioEliminado = await Usuario.findByIdAndUpdate(id,{estado:false});


  res.json({
    // msg: "delete API - Controller",
    usuarioAutenticado,
    usuarioEliminado
  });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}