const { request, response } = require('express');
const mongoose = require('mongoose');

const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')
const Role = require('../models/role');


const coleccionesPermitidas =[
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino);
    
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            // Enviamos losresultados encontrados utilizando la validacion ternaria
           results: (usuario) ? [usuario]:[],
        });
    }
    // Nos apoyamos con la funcionalidad de la libreria RegExp para crear una expresion regular insensible a mayus/minus
    const expregTermino = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or:[
            {nombre:expregTermino},{correo:expregTermino}
        ],
        $and:[
            {estado: true}
        ]
    });
    const totalRegistrosConsultados =  Object.keys(usuarios).length;
    res.json({
        totalRegistrosConsultados,
        results: usuarios,
    });
    
    
}

const buscarCategorias = async(termino = '', res = response)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino);
    
    if (esMongoID) {
        const categorias = await Categoria.findById(termino);
        return res.json({
            // Enviamos losresultados encontrados utilizando la validacion ternaria
           results: (categorias) ? [categorias]:[],
        });
    }
    // Nos apoyamos con la funcionalidad de la libreria RegExp para crear una expresion regular insensible a mayus/minus
    const expregTermino = new RegExp(termino, 'i');
    const categorias = await Categoria.find({
        $or:[
            {nombre:expregTermino},
        ],
        $and:[
            {estado: true}
        ]
    });
    const totalRegistrosConsultados =  Object.keys(categorias).length;
    res.json({
        totalRegistrosConsultados,
        results: categorias,
    });
    
    
}

const buscarProductos = async(termino = '', res = response) => {
    // Validamos si el termino es un Mongo Id Valido y lo buscamos
    const esMongoID = mongoose.Types.ObjectId.isValid(termino);    
    let productos;
    let totalRegistrosConsultados;
  
    if (esMongoID) {
      productos = await Producto.findById(termino);
      totalRegistrosConsultados = productos ? 1 : 0;
    } else {
      // Si no es MongoId, validamos si el termino es un numero de precio Valido y lo buscamos
      // Nos apoyamos con la funcionalidad de la libreria RegExp para crear una expresion regular insensible a mayus/minus
      const expregTermino = new RegExp(termino, 'i');
      const value = expregTermino.exec(termino)[0];
  
      if (!isNaN(value)) {
        productos = await Producto.find({
          $or: [{precio: value}],
          $and: [{estado: true}]
        });
      } else {
        // Si no es un numero, validamos si el termino es un nombre y lo buscamos
        productos = await Producto.find({
          $or: [{nombre: expregTermino}],
          $and: [{estado: true}]
        });
      }
  
      totalRegistrosConsultados = Object.keys(productos).length;
    }
  
    res.json({
      ok: 'todo ok',
      totalRegistrosConsultados,
      results: productos || []
    });
  };
  

const buscar = async (req = request, res = response) => {
    const {coleccion, termino}=req.params;
    console.log(`GET sended Busqueda All ${coleccion}`);
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
           msg:`Las colecciones permitidas ${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'roles':
            console.log(termino)
            res.json({
                ok:'todo ok',
            });
            break;
        default:
            res.status(500).json({
                msg:`Busqueda no permitida para ${coleccion}`
            })
    }
}

module.exports = { buscar }