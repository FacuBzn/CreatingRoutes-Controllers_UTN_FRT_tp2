const express = require('express');
const port = process.env.PORT || 3000;

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/users';
        this.productsPath = '/products';

        this.routes();
    }

    routes(){     
        this.app.use( this.usersPath , require('../routes/users.routes'));
        this.app.use( this.productsPath , require('../routes/products.routes'));
    }

    listen(){        
        this.app.listen( this.port, ()  => {
            console.log(`Servidor corriendo en -> ${port}, http://localhost:${port}/`)
        });
    }

}

module.exports = Server;