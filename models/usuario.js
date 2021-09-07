const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    name : {
        type : String,
        required : [true, 'El nombre es obligatorio'] //El segundo es el mns de error
    },
    email : {
        type : String,
        required : [true, 'El email es obligatorio'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'La contraseña es obligatoria']
    },
    img : {
        type : String
    },
    role : {
        type : String,
        required : true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }

});


//Para sobreescribir el metodo toJSON debemos crear una funcion normal

UsuarioSchema.methods.toJSON = function (){
    const { __v, password, ...user } = this.toObject();
    return user;

} 

//Mongoose crea la colleccion con el nombre que le proporcionamos en plural (usuarioS), y el
//schema para definir los campos de la tabla.
module.exports = model('Usuario', UsuarioSchema);

