const { request, response } = require('express');
const mongoose = require('mongoose');

const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')
const Role = require('../models/role');
const usuario = require('../models/usuario');

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
            console.log(termino)
            res.json({
                ok:'todo ok',
            });
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