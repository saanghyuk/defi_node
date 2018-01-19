const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        maxlength:100
    },
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        require:true,
        minlength:5
    },
    role:{
        type:Number,
        default:2
    },
    token:{
        type:String
    }
});

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                console.log(err);
                next();
            })
        })
    }else{
        next();
    }
});

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET);
    user.token = token;
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.methods.comparePassword = function(candidatePassword, cb){

    bcrypt.compare(candidatePassword, this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })

}

const User = mongoose.model('User',userSchema);

module.exports = {User};