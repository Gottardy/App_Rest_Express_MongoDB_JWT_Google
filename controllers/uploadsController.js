const { request, response } = require('express');
const {subirArchivo} = require('../helpers/subir-archivo');

const cargarArchivo = async (req = request, res = response) =>{

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({msg:'No se cargaron archivos.'});
  }
  // Subir Archivos formato Imagenes ['png', 'jpg', 'jpeg', 'gif']
  const rutaCompleta = await subirArchivo(req.files);
  res.json({
    ubicacion:rutaCompleta
  });

}

module.exports ={
    cargarArchivo
}