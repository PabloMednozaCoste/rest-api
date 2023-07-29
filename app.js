const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para agregar las rutas
app.use(routes);

// Iniciar el servidor y escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
