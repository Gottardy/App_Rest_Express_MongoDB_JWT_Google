const path = require('path');
const {v4:uuidv4} = require('uuid');
const { request, response } = require('express');

const cargarArchivo = async (req = request, res = response) =>{

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({msg:'No se cargaron archivos.'});
  }

  const {archivo} = req.files;
// Separamos el nombre del archivo con su extension
  const archivoCortado = archivo.name.split('.')
// Obtenemos la extension de la ultima posicion del nombre cortado
  const extension = archivoCortado[archivoCortado.length - 1];
// Las extensiones que permitiremos subir
  const extensionValidas = ['png','jpg','jpeg','gif','txt','md'];
  if (!extensionValidas.includes(extension)) {
    return res.status(400).json({msg:'Extension no es permitida'});
  }
// Creamos un nombre aleatorio para el archivo que se sube al directorio
  const nuevoNombre = uuidv4()+'.'+extension;
  const uploadPath = path.join(__dirname,'../uploads/',nuevoNombre);

  // Use el método mv() para colocar el archivo en algún lugar de su servidor
  archivo.mv(uploadPath, (err) =>{
    if (err)
      return res.status(500).json({err});

    res.json({msg:'File uploaded! =>'+uploadPath});
  });
}

module.exports ={
    cargarArchivo
}