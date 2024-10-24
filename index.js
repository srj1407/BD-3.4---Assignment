const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToCart(productId, name, price, quantity, cart) {
  let productToAdd = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(productToAdd);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addToCart(productId, name, price, quantity, cart);
  return res.json({ cartItems: result });
});

function updateQuantity(productId, quantity, cart) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantity(productId, quantity, cart);
  return res.json({ cartItems: result });
});

function deleteProduct(productId, cart) {
  return cart.filter((product) => product.productId != productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteProduct(productId, cart);
  return res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  return res.json({ cartItems: cart });
});

function calculateTotalQuantity(cart) {
  let result = 0;
  for (let i = 0; i < cart.length; i++) {
    result += cart[i].quantity;
  }
  return result;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  return res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  let result = 0;
  for (let i = 0; i < cart.length; i++) {
    result += cart[i].quantity * cart[i].price;
  }
  return result;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  return res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
