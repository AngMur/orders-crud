const express = require('express');
const db = require('./config');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

//Configurar sesion
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));


// Servir archivos estáticos (como CSS Y JS) desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));


//configuracion para el uso peticiones post
app.use(bodyParser.urlencoded({ extended: false }));


//platillas que sean dinamicas
app.set('view engine', 'ejs');


//iniciamos el server

//const hostname= '192.168.3.115';
const port = 3009;
app.listen(port, '0.0.0.0',()=>{
    console.log(`Servidor en funcionamiento desde http://0.0.0.0:${port}`);
});

//index
app.get('/', (req, res) => {
    const query = 'SELECT * FROM orders';
    const message = req.session.message; // Capturamos el mensaje de la sesión
    req.session.message = null; // Limpiamos el mensaje de la sesión para evitar mostrarlo nuevamente

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.send('Error');
        } else {
            // console.log(results);
            res.render('index', { orders: results, message: message });
        }
    });
});

//Register
app.get('/register', (req, res) => {
    const message = req.session.message; // Capturamos el mensaje de la sesión
    req.session.message = null; // Limpiamos el mensaje de la sesión para evitar mostrarlo nuevamente

    res.render('register', { message: message });      
});


//agregar orden
app.post('/add', (req, res) => {
    const { customer, location, date, amount, email, phone, notes } = req.body;
    const query = 'INSERT INTO orders (name, photo_url, location, order_date, status, amount, email, phone, notes) VALUES (?, "/images/no-profile.jpg", ?, ?, "Pending", ?, ?, ?, ?)';

    // console.log(customer, location, date, amount, email, phone, notes);
    db.query(query, [customer, location, date, amount, email, phone, notes], (err) => {
        if (err) {
            console.error('Error adding order:', err);
            req.session.message = 'Error adding order';
        } else {
            req.session.message = 'Order added succesfully';
        }
        res.redirect('/');
    });
});

//buscar usuario
app.get('/find/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM orders WHERE id = ?';
    db.query(query, [id], (err, results) => {
        // req.session.message = null;
        res.render('edit', { order: results[0] });
    });
});

// actualizar 
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const query = 'UPDATE orders SET status = ?, notes = ? WHERE id = ?';

    db.query(query, [status, notes, id], (err) => {
        if (err) {
            console.error('Error updating user:', err);
            res.send('Error');
        } else {
            req.session.message = 'Order updated successfully';
            res.redirect('/');

        }
    });
});


//eliminar usuario
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting user:', err);
            req.session.message = 'Error deleting user';
        } else {
            req.session.message = 'Orden deleted successfully';
        }
        res.redirect('/');
    });
});

