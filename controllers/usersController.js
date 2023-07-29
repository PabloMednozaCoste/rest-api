const db = require('../db');
const bcrypt = require('bcrypt');
const config = require('../config');

function registerUser(req, res) {
  const { nombre, email, password, nivel } = req.body;

  // Verificar si faltan campos requeridos
  if (!nombre || !email || !password || !nivel) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }

  // Hash de la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    nombre,
    email,
    password: hashedPassword,
    nivel,
  };

  // Insertar el nuevo usuario en la base de datos
  db.query('INSERT INTO usuarios SET ?', newUser, (error, result) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ message: 'Usuario registrado exitosamente' });
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  // Verificar si faltan campos requeridos
  if (!email || !password) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }

  // Buscar el usuario en la base de datos por su email
  db.query('SELECT * FROM usuarios WHERE email = ?', email, (error, results) => {
    if (error) {
      console.error('Error al recuperar usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];

    // Verificar la contraseña
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

  });
}

module.exports = {
  registerUser,
  loginUser,
};
