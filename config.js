// config.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Cambia esto según tu configuración
    user: 'root',
    password: '',
    database: 'OrdersDB'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;
