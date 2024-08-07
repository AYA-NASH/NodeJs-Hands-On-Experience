const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'Images');
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFilter =(req, file, cb)=>{
    if(file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'  
    ){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use('/Images', express.static(path.join(__dirname, 'Images')));


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT ,  PATCH ,  DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const errorData = error.data
    res.status(status).json({message: message, data: errorData});
})

mongoose.connect(
    'mongodb+srv://ayanashaat99:H6rUIq2elSKY63gs@cluster0.u4n9mhf.mongodb.net/messages'
).then(res=>{
    const server = app.listen(8080);
    const io = require('./socket').init(server);
    io.on('connection', socket=>{
        console.log('Client Connected');
    });
    console.log('Server coneected');
}).catch(err=>{
    console.log(err);
})

