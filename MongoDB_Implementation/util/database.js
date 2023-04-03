//creating connection to the database
const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;

let _db;

const mongoConnect = connect =>{
    mongoClient.connect('mongodb+srv://MJ:uIbGFhBrzFl43muG@cluster0.zhmwh56.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client =>{
        console.log('Connected!!');
        _db = client.db()
        connect(client); 
    })
    .catch(err =>{
        console.log(err);
        throw err;
    })
}

const getDB = () =>{
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;