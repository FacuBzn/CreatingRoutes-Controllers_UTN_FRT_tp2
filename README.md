# Documentación de los archivos del proyecto

A continuación se presenta una documentación detallada para los archivos del proyecto.

## app.js

El archivo `app.js` es el punto de entrada de la aplicación. Este archivo configura la carga de las variables de entorno y crea una instancia del servidor que escuchará las solicitudes entrantes. A continuación, se presenta una descripción de las líneas de código que componen este archivo:

```
require('dotenv').config();
```

Este código carga las variables de entorno desde un archivo `.env` en el directorio raíz del proyecto.

```
const Server = require('../siteE_commerce/models/server');
const server = new Server();
server.listen();
```

Estas líneas de código crean una instancia del servidor y lo ponen en funcionamiento.

## products.route.js

El archivo `products.route.js` define las rutas que manejan las solicitudes relacionadas con los productos. A continuación, se presenta una descripción de las líneas de código que componen este archivo:

```
const { Router } = require('express');
const { getAllProducts } = require('../controller/products.controller');
const router = Router();
```

Estas líneas de código importan el enrutador de Express, el controlador que maneja la solicitud de obtener todos los productos y crean una instancia del enrutador.

```
router.get('/', getAllProducts );
module.exports = router;
```

Estas líneas de código definen la ruta que maneja la solicitud de obtener todos los productos y exportan el enrutador.

## users.routes.js

El archivo `users.routes.js` define las rutas que manejan las solicitudes relacionadas con los usuarios. A continuación, se presenta una descripción de las líneas de código que componen este archivo:

```
const { Router } = require('express');
const { authUsers, registerUsers} = require('../controller/users.controller');
const router = Router();
```

Estas líneas de código importan el enrutador de Express, los controladores que manejan la solicitud de autenticación y registro de usuarios, y crean una instancia del enrutador.

```
router.post('/login' ,authUsers );
router.post('/register' ,registerUsers );
module.exports = router;
```

Estas líneas de código definen las rutas que manejan las solicitudes de autenticación y registro de usuarios y exportan el enrutador.

## server.js

El archivo `server.js` define la configuración del servidor y las rutas que manejan las solicitudes entrantes. A continuación, se presenta una descripción de las líneas de código que componen este archivo:

Estas líneas de código importan el marco de trabajo Express y definen el puerto en el que se ejecutará el servidor.

```
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
```

- `const express = require('express');`: importa el módulo `express` que se utiliza para crear la aplicación web.
- `const port = process.env.PORT || 3000;`: define el número de puerto en el que se ejecutará la aplicación. El valor del puerto se establece en la variable de entorno `PORT`, si está definida, de lo contrario se utiliza el valor `3000`.
- `class Server { ... }`: define la clase `Server`.
- `constructor() { ... }`: el constructor de la clase `Server` inicializa las propiedades de la instancia. En particular, crea una instancia de la aplicación web utilizando `express()` y asigna el puerto a la propiedad `this.port`.
- `this.usersPath = '/users';` y `this.productsPath = '/products';`: define las rutas para las solicitudes HTTP entrantes que se manejarán en el servidor.
- `routes() { ... }`: es un método que define las rutas que manejan las solicitudes entrantes. Se utiliza para separar la definición de rutas de la creación de la aplicación web, lo que facilita la lectura y la comprensión del código.
- `this.app.use( this.usersPath , require('../routes/users.routes'));` y `this.app.use( this.productsPath , require('../routes/products.routes'));`: se definen las rutas y se asignan los manejadores de las solicitudes entrantes. En este caso, se utilizan los archivos `users.routes.js` y `products.routes.js` para manejar las solicitudes entrantes que comienzan con las rutas `/users` y `/products`, respectivamente.
- `listen() { ... }`: se utiliza para escuchar en el puerto especificado y comenzar a manejar las solicitudes entrantes. En este caso, el método `listen` de la instancia de la aplicación web se llama y se especifica un callback que imprime el mensaje "Servidor corriendo en ->" seguido del número de puerto en la consola.

En resumen, el archivo `server.js` es responsable de crear una instancia de la aplicación web, definir las rutas y manejar las solicitudes entrantes.