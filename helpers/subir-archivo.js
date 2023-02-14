const path = require('path');
const {v4:uuidv4} = require('uuid');

const subirArchivo = (files, extensionValidas = ['png', 'jpg', 'jpeg', 'gif'], nombreCarpeta ='') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        // Separamos el nombre del archivo con su extension
        const archivoCortado = archivo.name.split('.')
        // Obtenemos la extension de la ultima posicion del nombre cortado
        const extension = archivoCortado[archivoCortado.length - 1];
        // Las extensiones que permitiremos subir
        if (!extensionValidas.includes(extension)) {
            return reject(`Extension '${extension}' no es permitida`);
        }
        // Creamos un nombre aleatorio para el archivo que se sube al directorio
        const nuevoNombre = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', nombreCarpeta, nuevoNombre);

        // Use el método mv() para colocar el archivo en algún lugar de su servidor
        archivo.mv(uploadPath, (err) => {
            if (err){
              return reject(err);  
            }
            resolve(nuevoNombre);
        });
    });

}

module.exports={
    subirArchivo
}