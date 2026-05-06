// config/db.js
// Configuración de conexión a MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',           // Cambia por tu contraseña MySQL
  database: 'inventario_tienda'
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    process.exit(1);
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;