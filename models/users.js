const mongoose= require('mongoose');
const multer= require('multer');

const path= require('path');
const AVATAR_PATH= path.join('/uploads/users/avatars');

const userSchema= new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "radio": {
        type: String,
        required: true
    },
    "checkbox": {
        type: String,
        default: "off"
    },
    "time": {
        type: Date,
        required: true
    },
    "number": {
        type: Number,
        required: true
    },
    "selection": {
        type: String,
        enum : ['1','2','3'],
        default: '1'
    },
    "avatar": {
        type: String
    }
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // '..' is used to move one step above in directory
        // to get value of __dirname, do console.log(__dirname)
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }           
});

userSchema.statics.uploadedAvatar= multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath= AVATAR_PATH;

const users= mongoose.model('users', userSchema);
module.exports= users;