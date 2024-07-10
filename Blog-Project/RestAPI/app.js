const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth');
const { clearImage } = require('./util/file');
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

    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

app.use(auth);

app.put('/post-image', (req, res, next)=>{
    if(!req.isAuth){
        throw new Error('Not authenticated!');
    }
    if(!req.file){
        return res.status(200).json({message: 'No file provided'});
    }
    if(req.body.oldPath){
        clearImage(req.body.oldPath)
    }
    console.log('Image Stored!!\nImage PATH:\n',req.file.path )
    return res.status(201).json({message: "file stored", filePath: req.file.path});
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
              return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
          }
    })
  );
  

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
   app.listen(8080);
}).catch(err=>{
    console.log(err);
})

