const mongoose = require('mongoose');

//User schema
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);