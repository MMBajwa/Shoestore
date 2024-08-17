const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
    { id: 1, name: 'Peshawri Chapal', price: 3000 },
    { id: 2, name: 'Men Formal', price: 7000 },
    { id: 3, name: 'Men Casual', price: 2500 },
    { id: 4, name: 'Women Heels', price: 5000 },
    { id: 5, name: 'Women Sandals', price: 3500 },
    { id: 6, name: 'Kids Sneakers', price: 2000 },
    { id: 7, name: 'Men Boots', price: 8000 },
    { id: 8, name: 'Women Flats', price: 2800 },
    { id: 9, name: 'Men Loafers', price: 4500 },
    { id: 10, name: 'Women Slippers', price: 1500 },
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/cart', (req, res) => {
    const cart = req.body.cart;
    console.log('Order received:', cart);
    res.status(200).send('Order received');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
