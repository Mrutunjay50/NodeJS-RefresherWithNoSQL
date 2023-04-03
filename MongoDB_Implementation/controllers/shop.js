const Product = require('../models/product');
const totalPrice = 0;
exports.getProductsToShow = (req,res,next)=>{
    Product.fetchAll().then(product => {
        res.render('shop/index',{pageTitle : 'Books Are For Peace Of Mind',Prods : product, path : '/'});
    }).catch(err => console.log(err));
}
exports.getAllProducts = (req,res,next)=>{
    Product.fetchAll().then(product => {
        res.render('shop/product-list',{pageTitle : 'All books available',Prods : product, path : '/product-list'});
    }).catch(err => console.log(err));
}
exports.getProductDetail = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(products => {
            res.render('shop/product-details',{pageTitle : 'detail of the product',Prods : products, path : '/product-list'});
        })
        .catch(err => console.log(err));
}

exports.addToCart = (req,res,next) =>{
    const prodId = req.body.productId;
    Product.findByPk(prodId).then(product =>{
        return req.user.addToCart(product).then(result =>{
            console.log(product);
            res.redirect('/carts');
        }).catch(err =>{
            console.log(err)
        })
    })
}
exports.getCart =(req,res,next) =>{
    req.user.getCart()
    .then(cart =>{
        res.render('shop/cart',{path:'/carts', pageTitle:'Your Cart', products : cart})
    })
    .catch(err=> console.log(err))
}

exports.deleteProductFromCart = (req,res,next) =>{
    const prodId = req.body.productId;
    req.user.deleteCartItem(prodId)
    .then(cart =>{
            res.redirect('/carts');
        })  
}

exports.createOrder =(req,res,next)=>{
    let fetchedCart;
    req.user.orderCreation()
    .then(result =>{
        res.redirect('/');
    })
    .catch(err => console.log(err))
}

exports.getOrders =(req,res,next) =>{
    req.user.getOrders()
    .then(orders =>{
        console.log(orders);
        res.render('shop/orders',{path:'/orders', pageTitle:'Your Orders', order : orders})
    })
    .catch()
}