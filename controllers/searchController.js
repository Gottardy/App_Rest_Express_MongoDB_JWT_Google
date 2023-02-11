const { request, response } = require('express');

const buscar = async (req = request, res = response) => {
    console.log('GET sended Busqueda All');

    const {coleccion, termino}=req.params;

    res.json({
        msg:'Todo ok',
        coleccion,
        termino
    })
}

module.exports = { buscar }