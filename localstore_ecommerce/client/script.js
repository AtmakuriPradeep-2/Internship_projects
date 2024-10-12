// client/script.js
let cart = [];
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    const products = await response.json();
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100px;">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
};

const addToCart = (id, name, price) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
};

const updateCart = () => {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
    });
    totalPriceElement.textContent = total.toFixed(2);
};

fetchProducts(); // Initial fetch
