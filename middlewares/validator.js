//Un middleware no es más que una funcion. Vamos a crear la nuestra.

const { validationResult } = require("express-validator")


const validarCampos = ( req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    //Si no entró al if, pasó la validación y sigue el metodo next para continuar con el stge middleware
    next();
}


module.exports = {
    validarCampos
}