const mongodb = require('mongodb');
const database = require('../util/database');


module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id;
  }

  save(){
    const db = database.getDb(); // get Database Connection
    let dbOp;
    if(this._id){
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})
    }
    else{
      dbOp= db.collection('products').insertOne(this)
    }
    return dbOp 
    .then(result=>{
      console.log(result);
    })
    .catch(err=>{
      console.log(err);
    })    
  }
 
  static fetchAll(){
    const db = database.getDb();
    return db.collection('products').find().toArray()
            .then(products=>{
              console.log(products)
              return products
            })
            .catch(err=>{
              console.log(err)
            })
  }

  static findById(prodId){
    const db = database.getDb();
    return db.collection('products')
             .find({_id: new mongodb.ObjectId(prodId)})
             .next()
             .then(product=>{
                console.log(product);
                return product;
             })
             .catch(err=>{
              console.log(err);
             })
  }

  static deleteById(prodId){
    const db = database.getDb();
    return db.collection('products')
             .deleteOne({_id: new mongodb.ObjectId(prodId)})
             .then(result=>{
                console.log('Product Deleted!!!!!!');
             })
             .catch(err=>{
                console.log(err);
             })
  }

};