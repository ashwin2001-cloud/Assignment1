const mongoose= require('mongoose');

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
        default: 'NEW'
    }
})

const users= mongoose.model('users', userSchema);
module.exports= users;