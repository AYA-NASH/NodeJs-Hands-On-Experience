const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose = require('mongoose')
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next)=>{
    User.findById('6625555916b00f96126d626f')
    .then(user=>{
        req.user = user; 
        next();
    })
    .catch(err=>{
        console.log(err);
    })
    
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://ayanashaat99:H6rUIq2elSKY63gs@cluster0.u4n9mhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(client=>{
    return User.findOne()
})
.then(user=>{
    if(!user){
        const user = new User({
            name:'Aya',
            email:'aya@gmail.com',
            cart: {
                items: []
            }
        });
        user.save()
    }
})
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})