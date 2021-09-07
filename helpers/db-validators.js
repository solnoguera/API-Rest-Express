const Role = require('../models/role');
const Usuario = require('../models/usuario');

const checkRole = async (role = '') => {
    const existeRol = await Role.findOne( {role} )
    if(!existeRol){
        throw new Error(`El rol: ${role} no está registrado en la base de datos.`)
    }
}

const checkExistingEmail = async ( email ) => {
    //Verificar si el correo existe   //Recibe objeto, esto es redundante en js
    const existsEmail = await Usuario.findOne({email});
    if(existsEmail){
        throw new Error(`El correo: ${email} ya está registrado en la base de datos.`);
    }
}

const checkExistingID = async ( id ) => {
    const existsID = await Usuario.findById(id);
    if(!existsID){
        throw new Error(`El id: ${id} no está registrado en la base de datos.`);
    }
}

module.exports = {
    checkRole,
    checkExistingEmail,
    checkExistingID
}