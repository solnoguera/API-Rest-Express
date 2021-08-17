const express = require('express');
var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        
        //Middlewares: Es una funcion que siempre va a ejecutarse cuando levantemos nuestro servidor para darle otra funcionalidad
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
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