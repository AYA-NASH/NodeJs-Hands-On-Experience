const { validationResult } = require("express-validator");
const Post = require('../models/post');

exports.getPosts = (req, res, next)=>{
    res.status(200).json({
        posts:[
            {
                _id : '1',
                title: 'First Post',
                content: 'This is the first post!!',
                imageUrl: 'Images/cat.jpg',
                creator: {
                    name: 'Aya'
                },
                createdAt: new Date()
            }
        ]
    });
};

exports.creatPost = (req, res, next)=>{
    const errors = validationResult(req)
    const title = req.body.title;
    const content = req.body.content;
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'Validation Error!', errors: errors.array()})
    }

    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'Images/cat.jpg',
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
        console.log(err);
    })
}