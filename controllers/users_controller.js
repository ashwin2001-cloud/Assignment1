const Users = require('../models/users');

module.exports.login= async (req, res)=>{
    return res.render('login.ejs');
}

module.exports.signup= async (req, res)=>{
    return res.render('signup.ejs');
}

module.exports.createUser= async (req, res)=>{
    try{
        console.log('*********', req.body["checkbox"], '*********');
        let user= await Users.create(req.body);
        // console.log(req.body);
        if(req.body["checkbox"]=="true"){
            console.log('ha');
            user.checkbox= true;
            user.save();
            
        }
        return res.redirect('/users/login');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.createSession= async (req, res)=>{

}
