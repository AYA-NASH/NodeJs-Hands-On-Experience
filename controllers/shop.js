const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next)=>{
    const products = Product.fetchAll(products=>{
        res.render('shop/product-list'
                ,{
                    prods: products,
                    pageTitle: "All Products",
                    path:'/products'
                });
    });
}

exports.getProduct = (req, res, next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId, product=>{
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    
}


exports.getIndex = (req, res, next)=>{
    const products = Product.fetchAll(products=>{
        res.render('shop/index',
                {
                    prods: products,
                    pageTitle: "My Shop",
                    path:'/'
                });
    });
};

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId;
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.getCart = (req, res, next)=>{
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts = [];
            for(let prod of products){
                const cartProductData = cart.products.find(cartprod=> cartprod.id === prod.id);
                if(cartProductData){
                    cartProducts.push({productData: prod, qty: cartProductData.qty})
                }
            }

            res.render('shop/cart',
                        {
                            pageTitle: 'Your Cart',
                            path:'/cart',
                            products: cartProducts
                        });
        })
        
        
    })
    
};

exports.getCheckout = (req, res, next)=>{
    res.render('shop/checkout',
            {
                pageTitle: 'Checkout',
                path:'/checkout'
            });
};


exports.getOrders = (req, res, next)=>{
    res.render('shop/orders',
        {
            pageTitle: 'Your Orders',
            path:'/orders'
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect('/cart');
    });
  };







