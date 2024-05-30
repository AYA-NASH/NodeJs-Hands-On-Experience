const { validationResult } = require("express-validator");
const Post = require('../models/post');

exports.getPosts = (req, res, next)=>{
    Post.find()
    .then(posts=>{
        res.status(200).json({
            posts: posts
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