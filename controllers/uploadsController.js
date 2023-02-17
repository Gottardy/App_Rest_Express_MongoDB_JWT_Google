const { request, response } = require('express');
const {subirArchivo} = require('../helpers/subir-archivo');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const cargarArchivo = async (req = request, res = response) =>{

  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   return res.status(400).json({msg:'No se cargaron archivos.'});
  // }
  
  try {
    // Subir Archivos formato Imagenes ['png', 'jpg', 'jpeg', 'gif'] pero se le puede agregar otros tipos para diferentes archivos
    const rutaCompleta = await subirArchivo(req.files, ['png', 'jpg', 'jpeg', 'gif', 'txt', 'md'], 'detodo');
    res.json({
      ubicacion: rutaCompleta
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }


}

const actualizarImagen = async (req = request, res = response) =>{
  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   return res.status(400).json({msg:'No se cargaron archivos.'});
  // }  
  const {id, coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg:`No existe un usuario con el id :{${id}}`
        });
      }

      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg:`No existe un producto con el id :{${id}}`
        });
      }
      break;
  
    default:
      return res.status(500).json({
        msg:'Validacion de coleccion erronea'
      })
  }

  modelo.img = await subirArchivo(req.files, ['png', 'jpg', 'jpeg', 'gif', 'svg'], coleccion);
   await modelo.save();

  res.json({
    modelo
  });
}

module.exports ={
    cargarArchivo,
    actualizarImagen
}