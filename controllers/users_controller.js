const Users = require('../models/users');
const jwt= require('jsonwebtoken');
const path= require('path');

module.exports.home= async (req, res)=>{
    if(req.cookies.jwt){
        return res.redirect('/users/profile');
    }
    return res.render('home.ejs');
}

module.exports.login= async (req, res)=>{
    return res.render('login.ejs');
}

module.exports.signup= async (req, res)=>{
    return res.render('signup.ejs');
}

//checking whether email is valid
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.createUser= async (req, res)=>{
    try{

        await Users.uploadedAvatar(req, res, async (err)=>{

            console.log(req.body, isValidEmail(req.body.email));
            //checking email from regex
            if(isValidEmail(req.body.email)==false){
                console.log('invalid');
                return res.redirect('/users/signup');
            }

            // console.log('*********', req.body["checkbox"], '*********');
            let user= await Users.create(req.body);

            console.log('***', req.body, '***');
            if(req.file){
                user.avatar= Users.avatarPath + '/' + req.file.filename;
                user.save();
            }
            // console.log(req.body);
            if(req.body["checkbox"]=="true"){
                // console.log('ha');
                user.checkbox= "on";
                user.save();
                
            }
            return res.redirect('/users/login');
        })
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
        delete req.token;
        delete req.user;
        console.log('++',req.user,'++');
        return res.redirect('/users/login');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.page1= async (req, res)=>{
    try{
        return res.render('page1.ejs');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.page2= async (req, res)=>{
    try{
        return res.render('page2.ejs');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.page3= async (req, res)=>{
    try{
        return res.render('page3.ejs');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.userInfo= async (req, res)=>{
    try{
        let verifyToken= jwt.verify(req.cookies.jwt, "jwt_secret");
        console.log(verifyToken);
        return res.render('userInfo.ejs', {
            user: verifyToken
        });
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.update= async (req, res)=>{
    try{
        let user= await Users.findOne({email: req.token.email});
        return res.render('update.ejs', {
            user: user
        });
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.updateUser= async (req, res)=>{
    try{
        await Users.uploadedAvatar(req, res, async (err)=>{
            let verifyToken= jwt.verify(req.cookies.jwt, "jwt_secret");
            let user= await Users.findOne({email: verifyToken.email});
            if(user){
                user.radio= req.body.radio;
                if(req.body["checkbox"]=="true"){
                    // console.log('ha');
                    user.checkbox= "on";
                    user.save();
                    
                }
                user.time= req.body.time;
                user.number= req.body.number;
                user.selection= req.body.selection;
                if(req.file){
                    user.avatar= Users.avatarPath + '/' + req.file.filename;
                }
                user.save();
            }
            return res.redirect('/users/logout');
        })
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.deleteAccount= async (req, res)=>{
    try{
        let verifyToken= jwt.verify(req.cookies.jwt, "jwt_secret");
        let user= await Users.findOneAndDelete({email: verifyToken.email});
        return res.redirect('/users/logout');
    }catch(err){
        console.log(err);
        return;
    }
}