const express = require('express');
const productsController = require('./controllers/productsController');
const usersController = require('./controllers/usersController');

const router = express.Router();

// Rutas para registro e inicio de sesión de usuarios
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

// Rutas relacionadas con los productos
router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProduct);
router.delete('/products/:id', productsController.deleteProduct);
router.put('/products/:id', productsController.updateProduct);

module.exports = router;
