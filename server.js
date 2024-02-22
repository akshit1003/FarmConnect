import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import ejs from "ejs";


const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static('public'));
// app.set('view engine','ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aadya2009$$',
    database: 'my_cart_database'
})

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.post('/cart', (req, res) => {
    const { product_name, price, quantity } = req.body;
    const sql = 'INSERT INTO cart_items (product_name, price, quantity) VALUES (?, ?, ?)';
    db.query(sql, [product_name, price, quantity], (err, result) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).send('Item added to cart');
        }
    });
});

// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

// // app.post("/", (req, res) => {
// //     res.send("<h1>Hello</h1>");
// // });

app.get('/cart', (req, res) => {
    const sql = 'SELECT * FROM cart_items';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(result);
        }
    });
});

app.listen(port, () => {
    console.log("Server is running at " + port);
})

