const express = require('express');
const path = require('path');

// const rootDir = require('../utilities/path');
const productController = require('../controllers/admin');
const Router = express.Router();



Router.get('/edit-product/:productId',productController.editProductsById);
Router.post('/editproduct',productController.updateEditProduct);
Router.post('/delete',productController.deleteProduct);
Router.get('/add-product',productController.getProductPage);
Router.post('/productdata',productController.postProducts);
Router.get('/products',productController.getProductsAdmin);


module.exports = Router;