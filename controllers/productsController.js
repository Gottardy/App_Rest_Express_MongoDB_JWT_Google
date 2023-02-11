const { request, response } = require('express');

const Producto = require('../models/producto');

const obtenerProductos = async (req = request, res = response) => {
    console.log('GET sended productos All');
    // Desesctruturando el query de los parametros 
    // Creamos la solicitud de Paginacion de resultados con usuarios con estado 'true'
    const {pag = 5, rang = 0} = req.query;
    const query = {estado: true};

    const [totalRegistrosBD, productos] = await Promise.all([
      Producto.countDocuments(query),
      await Producto.find( query )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(rang))
        .limit(Number(pag))
    ])
    const totalRegistrosConsultados =  Object.keys(productos).length;

    res.json({
    // msg: 'get API - Controller',
    ok:'Todo Ok',
    totalRegistrosBD,
    totalRegistrosConsultados,
    productos,    
    });
}
const obtenerProducto = async (req = request, res = response) => {
    console.log('GET sended producto: Id');
    // Recibiendo el parametro 'id' de la ruta y utilizandolo
    const id = req.params.id;
    const {uid, nombre,estado,usuario, categoria} =  await Producto.findById( id )
                                                    .populate('usuario', 'nombre')
                                                    .populate('categoria', 'nombre')
    
    res.json({
    // msg: 'get API - Controller',
    ok:'Todo Ok',
    nombre,
    usuario,
    categoria
    });
}
const actualizarProducto = async (req = request, res = response) => {
    console.log('PUT sended producto');
    // Recibiendo el parametro 'id' de la ruta y utilizandolo
      const id = req.params.id;
  
    // Desesctruturando el query de los parametros del body
      const { estado, usuario, ...restoDatos} = req.body;
    // Confirmo el formato del dato nombre en uppercase
      if(restoDatos.nombre){
            restoDatos.nombre = restoDatos.nombre.toUpperCase();
        }
    // Confirmamos el usuario autenticado que esta realizando la actualizacion
      restoDatos.usuario = req.usuarioAutenticado.id;
  
    // Guardar en la BD 
      const producto = await Producto.findByIdAndUpdate(id, restoDatos);
  
      res.json({
      // msg: 'put API - Controller',
      ok:'Todo Ok',
      producto  
    });
}
const crearProducto = async (req = request, res = response) => {
    console.log('POST sended producto');
    // Desesctruturando el body
    const {estado, usuario ,...bodyData} = req.body
    const productoConsultado = await Producto.findOne({nombre:bodyData.nombre.toUpperCase()});
    // console.log(productoConsultado+'---'+bodyData.nombre.toUpperCase());
    if(productoConsultado){
      return res.status(400).json({
        msg:`El producto ${productoConsultado.nombre}, ya existe`
      })
    }
    // Generar la data a guardar en la BD
    const data = {
      ...bodyData,
      nombre:bodyData.nombre.toUpperCase(),
      usuario:req.usuarioAutenticado.id,
      
    }
    // instnciamos el objeto Producto
    const nuevoProducto = new Producto(data);
    console.log(nuevoProducto);
    // Guardar en la BD
    await nuevoProducto.save();
    res.status(201).json({
    // msg: 'post API - Controller POST',
    ok:'Todo Ok',
    nuevoProducto
    });
}
const eliminarProducto = async (req = request, res = response) => {
    console.log('DELETED sended producto');
    // Recibiendo el parametro 'id' de la ruta y utilizandolo
    const id = req.params.id;
    const usuarioAutenticado = req.usuarioAutenticado;
  
    //id Logicamente borrado de la BD, actualizando el estado a false
    const productoEliminado = await Producto.findByIdAndUpdate(id,{estado:false});
  
  
    res.json({
    // msg: "delete API - Controller",
    ok:'Todo Ok',
    usuarioAutenticado,
    productoEliminado
    
    });
}

module.exports = {
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto,  
    crearProducto, 
    eliminarProducto
}