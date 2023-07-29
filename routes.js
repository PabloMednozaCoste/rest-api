const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./authMiddleware');
const productsController = require('./controllers/productsController');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProduct);
router.delete('/products/:id', productsController.deleteProduct);
router.put('/products/:id', productsController.updateProduct);
