const express = require('express'); // Framework de Node.js para construir aplicaciones web y APIs.
const cookieParser = require('cookie-parser'); // Este Middleware nos sirve para analizar "cookies" en las solicitudes.
const bodyParser = require('body-parser'); // Middleware sirve para analizar el cuerpo de las solicitudes.
const morgan = require('morgan'); // Este Middleware nos muestra un registro de las solicitudes HTTP.
const routes = require('./routes/mainRouter.js');
const cors = require("cors") // Middleware que habilita el intercambio de recursos entre diferentes dominos.

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => { // Configuración de los encabezados para permitir CORS.
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(cors())
server.use('/', routes);

// Error catching endware. Middleware para manejar errores.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

// Cookies: pequeños archivos de datos almacenados en el navegador del usuario.
// CORS: politica de seguridad del navegador que controla como las pagínas web realizan solicitudes entre dominios.
