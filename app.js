// app.js
// Servidor principal - Inventario Electrónica CRUD

const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');

const app = express();

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// ── Rutas API ─────────────────────────────────────────────────────────────────
const productosRoutes = require('./routes/productos');
app.use('/api', productosRoutes);

// ── Ruta raíz → interfaz web ──────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Iniciar servidor ──────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📦 API disponible en http://localhost:${PORT}/api/productos\n`);
});