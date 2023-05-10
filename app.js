require('dotenv').config();
const Server = require('../siteE_commerce/models/server');
const server = new Server();
server.listen();