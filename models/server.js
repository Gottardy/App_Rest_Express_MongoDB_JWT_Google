const express = require('express');
const cors = require('cors');
const { conectionDB } = require('../DB/config.db');

class Server {
    
  constructor() {
    this.app = express();
    
    // Puerto expuesto
    this.port = process.env.PORT;

    // Rutas API
    this.routeUsersPath = '/api/usuarios';
    this.routeAuthPath = '/api/auth';

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
  }

  // Manejador de rutas
  routes() {
    this.app.use(this.routeUsersPath, require('../routes/userRoute'));
    this.app.use(this.routeAuthPath, require('../routes/authRoute'));
  }

  listener() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
