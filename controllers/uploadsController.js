const { request, response } = require('express');
const {subirArchivo} = require('../helpers/subir-archivo');

const cargarArchivo = async (req = request, res = response) =>{

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({msg:'No se cargaron archivos.'});
  }
  
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

module.exports ={
    cargarArchivo
}