const Product = require('../models/product'); 

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product',
                {
                    pageTitle: "Add Product",
                    path:'/admin/add-product',
                    editing: false,
                    isAuthenticated: req.loggedIn
                })
};

exports.postAddProduct = (req, res, next)=>{ 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user;
    
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        userId: userId
    });

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
    Product.findById(prodId)
    .then(product=>{
        res.render('admin/edit-product',
                {
                    pageTitle: "Edit Product",
                    path:'/admin/add-product',
                    editing: editMode,
                    product: product,
                    isAuthenticated: req.loggedIn
                });
    })
    .catch(err=>{
        console.log(err);
    });
    
};

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const title = req.body.title;
    const url = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.description;

    Product.findById(prodId)
    .then(product=>{
        product.title = title;
        product.imageUrl = url;
        product.price = price;
        product.description = desc;

        return product.save();
    })
    .then(result=>{
        console.log('Product Updated');
        res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.getProducts = (req, res, next)=>{
    Product.find()
    .then(products=>{
        res.render('admin/products'
                ,{
                    prods: products,
                    pageTitle: "Admin Products",
                    path:'/admin/products',
                    isAuthenticated: req.loggedIn
                });
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postDeleteProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err)
    });
}