const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try{
        //Devuelve una promesa, el objeto necesario para mandar
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify : false
        });

        console.log('Base de datos conectada!');

    } catch (err){
        console.log(err);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}


module.exports = {
    dbConnection
}