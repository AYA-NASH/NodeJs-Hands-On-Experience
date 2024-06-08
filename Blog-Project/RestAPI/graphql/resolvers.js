const bcrypt = require('bcryptjs');
const validator = require('validator') 
const User = require('../models/user');

module.exports = {
    createUser: async function({ userInput }, req){
        const errors = []
        if(!validator.isEmail(userInput.email)){
            errors.push({message: 'Invalid Email'})
        }
        if (validator.isEmpty(userInput.password) ||
            validator.isLength(userInput.password, {min: 5})){
            errors.push({message:'too short Password'})
        }
        if (errors.length > 0){
            const error = new Error('Invalid Input.')
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const userExist = await User.findOne({email: userInput.email})
        if(userExist){
            const err = new Error('User already exists!')
            throw err;
        }
        const hashedPass = await bcrypt.hash(userInput.password, 12);
        const user = new User({
          email: userInput.email,
          name: userInput.name,
          password: hashedPass
        });
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    } 
}