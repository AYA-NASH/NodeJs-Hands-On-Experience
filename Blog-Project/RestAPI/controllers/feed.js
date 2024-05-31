const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
const Post = require('../models/post');

exports.getPosts = (req, res, next)=>{
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems; // keeps track total items in DB.
    Post.find()
    .countDocuments()
    .then(count=>{
        totalItems = count;
        return Post.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
    })
    .then(posts=>{
        res.status(200).json({
            message: 'Posts Fetched Successfully.',
            posts: posts,
            totalItems: totalItems
        });
    })
    .catch((err)=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })    
};

exports.getPost = (req, res, next)=>{
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error("Post Can't be FOUND!!!");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({post: post});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.creatPost = (req, res, next)=>{
    const errors = validationResult(req)
    const title = req.body.title;
    const content = req.body.content;
    if(!errors.isEmpty()){
        const error = new Error('Validation Error!!!!!!!');
        error.statusCode = 422;
        throw error;
    }

    if(!req.file){
        const error = new Error('No Image Provided');
        error.statusCode = 422;
        throw error
    }

    const imageUrl = req. file.path;

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator:{
            name:'Aya'
        }
    });

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'Post created Successfully',
            post: result
        })
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updatePost = (req, res, next)=>{
    const postId = req.params.postId;
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const error = new Error('Validation Error!!!!!!!');
        error.statusCode = 422;
        throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;

    if(req.file){ // If a new Image is set 
        imageUrl = req.file.path;
    }

    if(!imageUrl){
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    
    Post.findById(postId)
    .then(post=>{

        if(!post){
            const error = new Error("Post Can't be FOUND!!!");
            error.statusCode = 404;
            throw error;
        }

        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl;

        if(imageUrl !== post.imageUrl){
            clearImage(post.imageUrl)
        }

        return post.save();
    })
    .then(result=>{
        res.status(200).json({message: 'Post UPDATED', post:result})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.deletePost = (req, res, next)=>{
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error("Post Can't be FOUND!!!");
            error.statusCode = 404;
            throw error;
        }
        clearImage(post.imageUrl)
        return Post.findByIdAndDelete(postId);
    })
    .then(result=>{
        console.log("Deletion Result: ", result);
        res.status(200).json({message: 'Deleted post.'});
    })
    .catch(err=>{
        console.log(err)
    })
}

const clearImage = filePath =>{     // call whenever a new Image uploaded
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err=> console.log(err));
}