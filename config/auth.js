const jwt= require('jsonwebtoken');
const Users= require('../models/users');

const auth= async (req, res, next)=>{
    try{
        const token= req.cookies.jwt;
        const verifyToken= jwt.verify(token, "jwt_secret");
        // console.log(verifyToken);
        
        next();

    }catch(err){
        console.log(err);
        return;
    }
}

module.exports= auth;