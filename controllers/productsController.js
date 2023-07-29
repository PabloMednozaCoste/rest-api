const db = require('../db');

function getAllProducts(req, res) {
  // Obtener todos los productos de la base de datos
  db.query('SELECT * FROM productos', (error, results) => {
    if (error) {
      console.error('Error al recuperar los productos:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
}

function createProduct(req, res) {
  const { nombre, cantidad, precio, imagen } = req.body;

  // Verificar si faltan campos requeridos
  if (!nombre || !cantidad || !precio || !imagen) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }

  const newProduct = {
    nombre,
    cantidad,
    precio,
    imagen,
  };

  // Insertar el nuevo producto en la base de datos
  db.query('INSERT INTO productos SET ?', newProduct, (error, result) => {
    if (error) {
      console.error('Error al crear el producto:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ message: 'Producto creado exitosamente' });
  });
}

function deleteProduct(req, res) {
  const productId = req.params.id;

  // Eliminar el producto de la base de datos
  db.query('DELETE FROM productos WHERE id = ?', productId, (error, result) => {
    if (error) {
      console.error('Error al eliminar el producto:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
}

function updateProduct(req, res) {
  const productId = req.params.id;
  const { nombre, cantidad, precio, imagen } = req.body;

  // Verificar si faltan campos requeridos
  if (!nombre || !cantidad || !precio || !imagen) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const updatedProduct = {
    nombre,
    cantidad,
    precio,
    imagen,
  };

  // Actualizar el producto en la base de datos
  db.query('UPDATE productos SET ? WHERE id = ?', [updatedProduct, productId], (error, result) => {
    if (error) {
      console.error('Error al actualizar el producto:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado exitosamente' });
  });
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
