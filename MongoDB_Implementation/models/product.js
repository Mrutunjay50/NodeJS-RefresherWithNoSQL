const mongoDB =  require('mongodb');
const getDb = require('../util/database').getDB;

 class Product {
    constructor(productName,productPrice,description,currentDate,id,userId) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.description = description;
        this.currentDate = currentDate;
        this._id = id ? new mongoDB.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOP;
        if(this._id){
            dbOP = db.collection('products').updateOne({_id : this._id},{$set : this})
        }else{
            dbOP = db.collection('products').insertOne(this);
        }
        return dbOP.then(result =>{
                console.log("product Now Saved");
            })
            .catch(err=>{
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray().then(products =>{
            // console.log("All products Fetched");
            return products;
        }).catch(err => {
            console.log(err);
        });
    }

    static findByPk(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id : new mongoDB.ObjectId(prodId)}).next().then(products =>{
            // console.log(products);
            return products;
        }).catch(err => console.log(err))
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({_id : new mongoDB.ObjectId(prodId)}).then(result =>{
            // console.log();
        }).catch(err =>{
            console.log(err)
        })
    }
}


module.exports = Product;