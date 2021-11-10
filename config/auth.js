const jwt= require('jsonwebtoken');
const Users= require('../models/users');

const auth= async (req, res, next)=>{
    try{
        const token= req.cookies.jwt;
        const verify= await jwt.verify(token, "jwt_secret");
        next();

    }catch(err){
        // console.log(err);
        return res.redirect('/users/login');
    }
}

module.exports= auth;