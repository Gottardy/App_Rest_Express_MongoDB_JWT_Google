const mongoose = require('mongoose');

const conectionDB = async() =>{
    try {
        await mongoose.connect( process.env.MONGO_DB_ATLAS );
        console.log('Base de datos online');  
    } catch (error) {
        console.log(error);
        throw new Error('Error la inicir la conexion Base de datos');
    }
}

module.exports = {
    conectionDB
}