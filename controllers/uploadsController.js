const path = require('path');
const { request, response } = require('express');

const cargarArchivo = async (req = request, res = response) =>{

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).send('No se cargaron archivos.');
  }

  const {archivo} = req.files;
  const uploadPath = path.join(__dirname,'../uploads/',archivo.name);

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