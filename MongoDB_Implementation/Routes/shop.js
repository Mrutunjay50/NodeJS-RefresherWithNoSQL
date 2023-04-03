const express = require('express');
const path = require('path');

const productController = require('../controllers/shop');

const Router = express.Router();

Router.get('/product-list',productController.getAllProducts);
Router.post('/cart-delete-item',productController.deleteProductFromCart);
Router.post('/cart',productController.addToCart);
Router.get('/carts',productController.getCart);
Router.post('/create-order',productController.createOrder);
Router.get('/order-items',productController.getOrders);
Router.get('/',productController.getProductsToShow);
Router.get('/product-list/:productId',productController.getProductDetail);

module.exports = Router;