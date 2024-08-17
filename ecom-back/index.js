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

