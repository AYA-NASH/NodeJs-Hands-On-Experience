const Product = require('../models/product'); 

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product',
                {
                    pageTitle: "Add Product",
                    path:'/admin/add-product',
                    editing: false
                })
};

exports.postAddProduct = (req, res, next)=>{ 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save()
    .then(result=>{
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
}; 


exports.getEditProduct = (req, res, next)=>{
    const editMode = req.query.edit;
    if(! editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product=>{
        res.render('admin/edit-product',
                {
                    pageTitle: "Edit Product",
                    path:'/admin/add-product',
                    editing: editMode,
                    product: product
                });
    });
    
};

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const title = req.body.title;
    const url = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.description;

    const updatedProduct = new Product(prodId, title, url, price, desc);
    updatedProduct.save();
    res.redirect('/admin/products')
};

exports.getProducts = (req, res, next)=>{
    const products = Product.fetchAll(products=>{
        res.render('admin/products'
                ,{
                    prods: products,
                    pageTitle: "Admin Products",
                    path:'/admin/products'
                });
    });
}


exports.postDeleteProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}