const { mongoDB, ObjectId } = require('mongodb');
const getDB = require('../util/database').getDB;


class User {
    constructor(username, email, cart,id){
        this.name = username;
        this.email = email;
        this.cart = cart; // {items : []}
        this._id = id;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    addToCart(product){
        const existingCartProductIndex = this.cart.items.findIndex(cart =>{
            return cart.productId.toString() === product._id.toString();
        })
        let initialQuantity = 1;
        let updatedCartItems = [...this.cart.items];
        if(existingCartProductIndex >= 0){
            initialQuantity = this.cart.items[existingCartProductIndex].quantity + 1;
            updatedCartItems[existingCartProductIndex].quantity = initialQuantity
        }else{
            updatedCartItems.push({productId : new ObjectId(product._id), quantity : initialQuantity})
        }
        const updatedCart = {items : updatedCartItems}
        const db = getDB();
        return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set : {cart:updatedCart}})
    }     

    getCart() {
        const db = getDB();
        const productIDs = this.cart.items.map(p =>{
            return p.productId;
        })
        return db.collection('products').find({_id : {$in : productIDs}}).toArray().then(products =>{
            return products.map(p =>{
                return {...p, quantity : this.cart.items.find(pro =>{
                    return pro.productId.toString() === p._id.toString();
                }).quantity}
            })
        })
    }

    deleteCartItem(prodId){
        
            const updatedProduct = this.cart.items.filter(p =>{
                return p.productId.toString() !== prodId.toString()
            })
        const db = getDB();
        return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set : {cart:{items : updatedProduct}}})

    }

    orderCreation(){
        const db = getDB();
        return this.getCart().then(products =>{
            const order = {
                items: products,
                user:{
                    _id : new ObjectId(this._id),
                    name : this.name
                }
            };
            return db.collection('orders').insertOne(order)
        })
        .then(result=>{
            return db.collection('users').updateOne({_id: new ObjectId(this._id)},{$set : {cart:{items : []}}})
        })
    }

    getOrders() {
        const db = getDB();
        return db.collection('orders').find({'user._id' : new ObjectId(this._id)}).toArray()
    }

    static findById(prodID){
        const db = getDB();
        return db.collection('users').findOne({_id : new ObjectId(prodID)}).then(product =>{
            return product
        }).catch(err=>{
            console.log(err);
        });
    }
}

module.exports = User;