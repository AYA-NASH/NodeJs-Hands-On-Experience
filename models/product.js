const mongodb = require('mongodb');
const database = require('../util/database');


module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    const db = database.getDb(); // get Database Connection
    return db.collection('products').insertOne(this)  // connect to a collection, and insert/pass an object(s)
                        //  to tell mongodb which collection to insert into/work with.
  
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

};