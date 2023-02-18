const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { conectionDB } = require('../DB/config.db');

class Server {
    
  constructor() {
    this.app = express();
    
    // Puerto expuesto
    this.port = process.env.PORT;

    // Rutas API
    this.routeUsersPath = '/api/usuarios';
    this.routeAuthPath = '/api/auth';
    this.routeCategoriesPath = '/api/categorias';
    this.routeProductsPath = '/api/productos';
    this.routeSearchPath = '/api/buscar';
    this.routeUploadPath = '/api/cargar'


    // Conexion a la base de datos
    this.conectarBaseDatos();

    // Middleware
    this.middlewares();

    // Rutas de la aplicacion
    this.routes();
  }

  async conectarBaseDatos(){
    await conectionDB();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    
    // Lectura  y Parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));

    //Cargue de archivos 
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      // tener encuenta esta propiedad para no subir cualquier carpeta
      createParentPath: true
  }));
  }

  // Manejador de rutas
  routes() {
    this.app.use(this.routeUsersPath, require('../routes/userRoute'));
    this.app.use(this.routeAuthPath, require('../routes/authRoute'));
    this.app.use(this.routeCategoriesPath, require('../routes/categoryRoute'));
    this.app.use(this.routeProductsPath, require('../routes/productRoute'));
    this.app.use(this.routeSearchPath, require('../routes/searchRoute'));
    this.app.use(this.routeUploadPath, require('../routes/uploadsRoute'));
  }

  listener() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
