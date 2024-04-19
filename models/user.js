const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId;

class User{
    constructor(name, email, cart, id){
        this.name = name;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId){
        const db = getDb();
        return db.collection('users').find({_id: new ObjectId(userId)}).next();
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(item=>{
            return item.productId.toString() == product._id.toString();
        })
        let newQuantity = 1;
        const updatedCartItems = [... this.cart.items]

        if(cartProductIndex >= 0){ // product does exist
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else{
            updatedCartItems.push({productId: new ObjectId(product._id) , quantity: newQuantity})
        }
        // if No Products in the Cart!
        const updatedCart = { items: updatedCartItems}
        const db = getDb();
        return db.collection('users')
                .updateOne({_id: new ObjectId(this._id)},
                            {$set: {cart: updatedCart}});
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(item => {
          return item.productId;
        });
        return db
          .collection('products')
          .find({ _id: { $in: productIds } })
          .toArray()
          .then(products => {
            return products.map(p => {
              return {
                ...p,
                quantity: this.cart.items.find(item => {
                  return item.productId.toString() === p._id.toString();
                }).quantity
              };
            });
          });
      }

    deletCartItem(productId){
        const updatedItems = this.cart.items.filter(item=>{
            return item.productId.toString() !== productId.toString();
        })

        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {items: updatedItems}}
        );
    }

    addOrder(){
      const db = getDb()
      return this.getCart()
          .then(products=>{
            const order = {
              items: products,
              user: {
                _id: new ObjectId(this._id),
                name : this.name
              }
            };
            return db.collection('orders').insertOne(order);
          })
          .then(result=>{
            // empty the cart in both the model and database
            this.cart = {items: []}
            return db.collection('users').updateOne(
              {_id: new ObjectId(this._id)},
              {$set: {cart: {items: []}}}
            )
          })
    }

    getOrders(){
      const db = getDb();
      return db.collection('orders')
               .find({'user._id': new ObjectId(this._id)})
               .toArray();
    }
}

module.exports = User;