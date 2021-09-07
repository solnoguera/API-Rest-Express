const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        
        //Conectar a base de datos
        this.conectarDB();

        //Middlewares: Es una funcion que siempre va a ejecutarse cuando levantemos nuestro servidor para darle otra funcionalidad
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    //Podriamos verificar en que entorno estamos en alguna variable de entorno y dependiente
    //de eso, nos conectamos a x base de datos.
    async conectarDB(){
        await dbConnection();
    }

    routes(){
        //El path que vamos a usar, y que voy a mandar a llamar
        this.app.use(this.usuariosPath , require('../routes/usuarios') );
        
    }

    middlewares(){
        //USE: INDICA QUE ES MIDDLEWARE

        //CORS
        this.app.use(cors());

        // Lectura y parseo del body en json
        //Cualquier post put o delete, lo va a intentar serializar a formato JSON.
        this.app.use(express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port,'...');
        })
    }
}

module.exports = Server;