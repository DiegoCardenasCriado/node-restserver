const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.routesPath = {
            auth:     '/api/auth',
            category: '/api/categories',
            product: '/api/products',
            user:     '/api/users'
        }
        
        // Conectar DB
        this.connectDB();

        // middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.routesPath.auth, require('../routes/auth.route'));
        this.app.use( this.routesPath.category, require('../routes/category.route'));
        this.app.use( this.routesPath.product, require('../routes/product.route'));
        this.app.use( this.routesPath.user, require('../routes/user.route'));
    }

    listen() {
        this.app.listen( this.port , () =>{
            console.log('Runing server on port:', this.port)
        } );
    }

}

module.exports = Server;