const { request, response } = require('express');
const bcrypt = require('bcryptjs');


const Categoria = require('../models/categoria');

const categorysGet = async (req = request, res = response) => {
  console.log('GET sended categorias');
    // Desesctruturando el query de los parametros 
    // Creamos la solicitud de Paginacion de resultados con usuarios con estado 'true'
    // const {pag = 5, rang = 0} = req.query;
    // const query = {estado: true};

    // const [totalRegistrosBD, usuarios] = await Promise.all([
    //   Usuario.countDocuments(query),
    //   await Usuario.find( query )
    //     .skip(Number(rang))
    //     .limit(Number(pag))
    // ])
    // const totalRegistrosConsultados =  Object.keys(usuarios).length;

    res.json({
    // // msg: 'get API - Controller',
    // totalRegistrosBD,
    // totalRegistrosConsultados,
    // usuarios
    ok:'Todo Ok'
    });
}

const categorysPut = async (req = request, res = response) => {
  console.log('PUT sended categorias');
  // Recibiendo el parametro 'id' de la ruta y utilizandolo
  //   const id = req.params.id;

  //   // Desesctruturando el query de los parametros del body
  //   const { password, google, correo, ...restoDatos} = req.body;

  //   // Encriptar de nuevo la nueva contraseña 
  //   if (password) {
  //     const salt = bcrypt.genSaltSync(12);
  //     restoDatos.password = bcrypt.hashSync(password, salt);
  //   }

  //   const usuario = await Usuario.findByIdAndUpdate(id, restoDatos);

    res.json({
  //   // msg: 'put API - Controller',
  //   usuario
  ok:'Todo Ok'
  });
}

const crearCategoria = async (req, res = response) => {
  console.log('POST sended categorias');
    // Desesctruturando el body
    const nombreCategoria  = req.body.nombre.toUpperCase();
    const categoriaConsultada = await Categoria.findOne({nombreCategoria});
    if(categoriaConsultada){
      return res.status(400).json({
        msg:`La categoria ${categoriaConsultada.nombre}, ya existe`
      })
    }
    // Generar la data a guardar en la BD
    const data = {
      nombre:nombreCategoria,
      // Se toma el usuario del request que valida el token JWT
      usuario:req.usuarioAutenticado.id
    }
    // instnciamos el objeto Categoria
    const nuevaCategoria = new Categoria(data);

    // Guardar en la BD
    await nuevaCategoria.save();
    res.status(201).json({
    // msg: 'post API - Controller POST',
    ok:'Todo Ok',
    nuevaCategoria
    });
  }

const categorysDelete = async (req, res = response) => {
  console.log('DELETED sended categorias');
  // Recibiendo el parametro 'id' de la ruta y utilizandolo
  // const id = req.params.id;
  // const usuarioAutenticado = req.usuarioAutenticado;

  // //id Logicamente borrado de la BD, actualizando el estado a false
  // const usuarioEliminado = await Usuario.findByIdAndUpdate(id,{estado:false});


  res.json({
  //   // msg: "delete API - Controller",
  //   usuarioAutenticado,
  //   usuarioEliminado
  ok:'Todo Ok'
  });
}

module.exports = {
    categorysGet,
    categorysPut,
    crearCategoria,
    categorysDelete
}