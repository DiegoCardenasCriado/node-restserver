const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        // middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    routes() {
        this.app.use( this.userPath, require('../routes/user.route.js'));
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    listen() {
        this.app.listen( this.port , () =>{
            console.log('Runing on port:', this.port)
        } );
    }

}

module.exports = Server;