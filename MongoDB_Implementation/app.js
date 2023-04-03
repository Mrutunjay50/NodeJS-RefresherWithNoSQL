const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorControllers = require('./controllers/errorHandlers')

const mongoConnect = require('./util/database').mongoConnect;
// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const app = express();
app.set('view engine','ejs');
app.set('views', 'views');

const adminRoute = require('./Routes/admin');
const userRoute = require('./Routes/shop');
// const rootDir = require('./utilities/path');
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname,'CSS')));

app.use((req,res,next) =>{
    User.findById('642aa1a539258765ec106d5c')
    .then(user =>{
        req.user = new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err => console.log(err))
})

app.use('/admin',adminRoute);
app.use(userRoute);

app.use(errorControllers.pageNotFound);


mongoConnect(() =>{
     app.listen(3000);
})