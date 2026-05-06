// routes/productos.js
// Definición de rutas REST para el CRUD de productos

const express    = require('express');
const router     = express.Router();
const multer     = require('multer');
const path       = require('path');
const ctrl       = require('../controllers/productosController');

// ── Configuración de Multer para subida de imágenes ──────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  }
});

// ── Rutas CRUD ────────────────────────────────────────────────────────────────
router.get   ('/productos',     ctrl.listarProductos);          // READ  – listar todos
router.post  ('/productos',     upload.single('imagen'), ctrl.crearProducto);    // CREATE
router.get   ('/productos/:id', ctrl.obtenerProductoPorId);     // READ  – uno
router.put   ('/productos/:id', upload.single('imagen'), ctrl.actualizarProducto); // UPDATE
router.delete('/productos/:id', ctrl.eliminarProducto);         // DELETE

module.exports = router;