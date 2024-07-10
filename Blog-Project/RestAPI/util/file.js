const fs = require('fs');
const path = require('path');

const clearImage = filePath =>{     // call whenever a new Image uploaded
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err=> console.log(err));
}

exports.clearImage = clearImage;