// controllers/productosController.js
// Controlador CRUD para productos del inventario

const connection = require('../config/db');

// ─────────────────────────────────────────
// CREATE – Crear un nuevo producto
// ─────────────────────────────────────────
exports.crearProducto = (req, res) => {
  const producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock:  req.body.stock,
    imagen: req.file ? req.file.filename : ''
  };

  const query = 'INSERT INTO productos SET ?';
  connection.query(query, producto, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      id: result.insertId
    });
  });
};

// ─────────────────────────────────────────
// READ – Listar todos los productos
// ─────────────────────────────────────────
exports.listarProductos = (req, res) => {
  connection.query('SELECT * FROM productos ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// READ – Obtener un producto por ID
exports.obtenerProductoPorId = (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result[0]);
  });
};

// ─────────────────────────────────────────
// UPDATE – Actualizar un producto existente
// ─────────────────────────────────────────
exports.actualizarProducto = (req, res) => {
  const id = req.params.id;
  const productoActualizado = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock:  req.body.stock,
    imagen: req.file ? req.file.filename : req.body.imagenActual
  };

  connection.query(
    'UPDATE productos SET ? WHERE id = ?',
    [productoActualizado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ mensaje: 'Producto actualizado exitosamente' });
    }
  );
};

// ─────────────────────────────────────────
// DELETE – Eliminar un producto
// ─────────────────────────────────────────
exports.eliminarProducto = (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  });
};