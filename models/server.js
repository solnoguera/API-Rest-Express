const express = require('express')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        //Middlewares: Es una funcion que siempre va a ejecutarse cuando levantemos nuestro servidor para darle otra funcionalidad
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    routes(){

        this.app.get('/api', (req, res) => {
            res.json({
                'msg': 'get API'
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                'msg': 'put API'
            });
        });
        
        this.app.post('/api', (req, res) => {
            res.status(201).json({
                'msg': 'post API'
            });
        });
        
        this.app.delete('/api', (req, res) => {
            res.json({
                'msg': 'delete API'
            });
        });
        
    }

    middlewares(){
        //USE: INDICA QUE ES MIDDLEWARE
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