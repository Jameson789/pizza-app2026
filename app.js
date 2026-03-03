import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const PORT = 3000;
app.use(express.static('public'));

//set ejs as view engine
app.set('view engine', 'ejs');

// "Middleware" that allows express to read
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));


//create db pool of db connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//db test route 
app.get('/dbtest', async (req, res) => {
    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    }catch(err) {
        console.log(`Database Error: ${err}`)
    }
});

// Default route
app.get('/', (req, res) => {
    res.render("home");
});

// Contact route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

// Confirmation route
app.get('/thank-you', (req, res) => {
    res.render("confirmation");
});

// Admin route
app.get('/admin', async (req, res) => {
    //read all orders from the database 
    // newest first 
    const orders = await pool.query("SELECT * FROM orders ORDER BY timestamp DESC")
    console.log(orders);

   res.render('admin', { orders: orders[0] });
});

// Submit order route
// {"fname":"a","lname":"aa","email":"a",
// "method":"delivery","toppings":["artichokes"],
// "size":"small","comment":"","discount":"on"}
app.post('/submit-order', async (req, res) => {
    const order = req.body
    
    // Create an array to store the order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        Array.isArray(req.body.toppings) ? req.body.toppings.join(",") : "none"
    ];

    //insert a new order into the db
    const sql = `INSERT INTO orders (fname, lname, email, method, toppings, size) VALUES (?, ?, ?, ?, ?, ?)`

    const result = await pool.execute(sql, params);

    console.log(result);

    res.render("confirmation", { order });
});

// Listen on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});