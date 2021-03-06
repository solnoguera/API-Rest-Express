//Crear funciones y exportarlas
//Sacamos los callbacks de las rutas para mejor separación.

//Para obtener los metodos de res, 
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//May para crear instancias de mi modelo
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response ) => {
    
    const {limit = 5, from = 0} = req.query;
    const query = {status : true};
    //Ejecuta las dos promesas en simultaneo, es más rapido y si una falla todas fallan.
    //No continua hasta que los dos procesos terminen gracias al await.

    //Desestructuracion de array
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from)) //Skip = Desde
            .limit(Number(limit))

    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req = request, res = response ) => {

    const {name, email, password, role} = req.body;
    // { google, ...resto } y mandamos el resto en Usuario
    //Aunque se manden campos de mas, no estarian en el modelo que definimos,
    //Por lo tanto mongoose los ignora por mi.
    const usuario = new Usuario({name, email, password, role});

    //Encriptar la contraseña o hacer el hash
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();
    //Limpieza, asegurar que no vengan scripts o inyecciones.
    res.status(201).json(usuario);
}


const usuariosPut = async(req = request, res = response ) => {

    const {id} = req.params;
    const {password, google, _id, role, email, ...resto} = req.body
    if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuario);
}


const usuariosDelete = async(req = request, res = response ) => {
    
    const {id} = req.params;
    //Borramos fisicamente : No recomendado
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {status : false});
    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}