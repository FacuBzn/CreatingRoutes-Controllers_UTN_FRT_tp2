const express = require('express');
const port = process.env.PORT || 3000;
const { dbConnection }= require('../database/config.js');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/users';
        this.productsPath = '/products';
        this.categoryPath = '/category';
        this.conectarDB();
        this.middleware();

        this.routes();
    }
    

    async conectarDB(){
        await dbConnection();
    }

    middleware() {
        //lectura y parseo del body
        this.app.use(express.json());
    }

    routes(){     
        this.app.use( this.usersPath , require('../routes/users.routes'));
        this.app.use( this.productsPath , require('../routes/products.routes'));
        this.app.use( this.categoryPath , require('../routes/categories.routes.js'));
    }

    listen(){        
        this.app.listen( this.port, ()  => {
            console.log(`Servidor corriendo en -> ${port}, http://localhost:${port}/`)
        });
    }

}

module.exports = Server;