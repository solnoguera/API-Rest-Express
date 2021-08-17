//Crear funciones y exportarlas
//Sacamos los callbacks de las rutas para mejor separación.

//Para obtener los metodos de res, 
const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {

    const { id, page = 0, limit = 100} = req.query;

    res.json({
        'msg': 'get API - Controller',
        id,
        page,
        limit
    });
}

const usuariosPost = (req = request, res = response ) => {

    //Extraer el body
    const body = req.body;

    //Limpieza, asegurar que no vengan scripts o inyecciones.
    res.status(201).json({
        'msg': 'post API - Controller',
        body
    });
}


const usuariosPut = (req = request, res = response ) => {

    const id = req.params.id;

    res.json({
        'msg': 'put API - Controller',
        id
    });
}


const usuariosPatch = (req = request, res = response ) => {
    res.json({
        'msg': 'patch API - Controller'
    });
}

const usuariosDelete = (req = request, res = response ) => {
    res.json({
        'msg': 'delete API - Controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}