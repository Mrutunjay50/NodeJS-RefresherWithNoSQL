const Product = require('../models/product');

const date = new Date();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let day = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;


exports.getProductPage = (req,res,next)=>{
        res.render('admin/edit-product',{pageTitle:"Add Product Page", path : '/add-product' , editing:false});
}


exports.postProducts = (req,res,next)=>{
    const productName = req.body.title;
    const productPrice = req.body.productPrice;
    const description = req.body.description;
    const product = new Product(productName,productPrice,description,currentDate,null,req.user._id);
    product
    .save()
    .then(result =>{
        console.log("Product Created!!");
        // console.log(result);
        res.redirect('/admin/products');
   })
   .catch(err => console.log(err))
}

exports.getProductsAdmin = (req,res,next)=>{
    Product.fetchAll().then(product => {
        res.render('admin/product',{pageTitle : 'Product-list for Admin',Prods : product, path : '/products'});
    }).catch(err => console.log(err));
}

exports.editProductsById = (req,res,next)=>{
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('admin/edit-product',{pageTitle : 'edit product page',Prods : product, path :'/edit-product', editing:editMode});
        })
        .catch(err => console.log(err)) 
}

exports.updateEditProduct = (req,res,next) =>{
    const ID = req.body.productId;
    const productName = req.body.title;
    const productPrice = req.body.productPrice;
    const description = req.body.description;
    const product = new Product(productName,productPrice,description,currentDate, ID);
    product.save()
        .then(product => {
            console.log("Product Updated!!")
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
    
}

exports.deleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId).then(() =>{
        console.log("Product Deleted!!")
        res.redirect('/admin/products');
    }).catch(err =>{
        console.log("Error Ocurred")
    })
    
}