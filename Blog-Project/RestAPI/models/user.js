const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String, 
        reqired:true
    },
    password: {
        type: String, 
        reqired:true
    },
    name: {
        type: String, 
        reqired:true
    },
    status:{
        type: String, 
        default: 'I am New'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);
