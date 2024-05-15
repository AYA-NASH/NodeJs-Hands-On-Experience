const {validationResult} = require('express-validator')
const Product = require('../models/product'); 
const { errorMonitor } = require('nodemailer/lib/xoauth2');

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product',
                {
                    pageTitle: "Add Product",
                    path:'/admin/add-product',
                    editing: false,
                    hasError: false,
                    errorMessage: null
                })
};

exports.postAddProduct = (req, res, next)=>{ 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).render('admin/edit-product',
        {
            pageTitle: "Add Product",
            path:'/admin/add-product',
            editing: false,
            hasError : true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg
        });
    }
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
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
      });
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
                    hasError: false,
                    errorMessage: null
                });
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    });
    
};

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const title = req.body.title;
    const url = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.description;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).render('admin/edit-product',
        {
            pageTitle: "Edit Product",
            path:'/admin/add-product',
            editing: true,
            hasError : true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg
        });
    }
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
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
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
                    hasError: false,
                    errorMessage: null
                });
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    });
}

exports.postDeleteProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500
        return next(error)
    });
}