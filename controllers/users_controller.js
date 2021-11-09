const Users = require('../models/users');
const jwt= require('jsonwebtoken');

module.exports.login= async (req, res)=>{
    return res.render('login.ejs');
}

module.exports.signup= async (req, res)=>{
    return res.render('signup.ejs');
}

module.exports.createUser= async (req, res)=>{
    try{
        // console.log('*********', req.body["checkbox"], '*********');
        let user= await Users.create(req.body);
        // console.log(req.body);
        if(req.body["checkbox"]=="true"){
            // console.log('ha');
            user.checkbox= true;
            user.save();
            
        }
        return res.redirect('/users/login');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.createToken= async (req, res)=>{
    try{
        let user= await Users.findOne({email: req.body.email});
        if(user){
            console.log(user, req.body.password);
            if(user.password==req.body.password){
                const token= await jwt.sign(user.toJSON(), 'jwt_secret');
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 1000000),
                    httpOnly:true
                });
                console.log('***', req.cookies.jwt, '***');
                return res.redirect('/users/profile');
            }
            else{
                console.log('****', 'Password did not match', '****');
                return;
            }
        }
        else{
            console.log('****', 'No such user exists', '****');
            return;
        }
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.profile= async (req, res)=>{
    try{
        res.render('profile.ejs');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.logout= async (req, res)=>{
    try{
        res.clearCookie("jwt");
        return res.redirect('/users/login');
    }catch(err){
        console.log(err);
        return;
    }
}