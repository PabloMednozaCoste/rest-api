const mysql = require('mysql');
const config = require('./config');

// Crear una conexión a la base de datos utilizando los valores de configuración
const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');
});

// Exportar la conexión para que esté disponible en otros módulos
module.exports = connection;
