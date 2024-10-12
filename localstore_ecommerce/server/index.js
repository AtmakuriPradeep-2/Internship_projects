// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample products
const products = [
    { id: '1', name: 'Product 1', description: 'Description of Product 1', price: 10, image: 'image1.jpg' },
    { id: '2', name: 'Product 2', description: 'Description of Product 2', price: 20, image: 'image2.jpg' },
    { id: '3', name: 'Product 3', description: 'Description of Product 3', price: 30, image: 'image3.jpg' },
];

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
