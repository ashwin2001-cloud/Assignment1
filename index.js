const express= require('express');
const app= express();
const port= process.env.PORT || 3000;

const db= require('./config/mongoose');
const path= require('path');

const cookieParser= require('cookie-parser');

const usersController= require('./controllers/users_controller');

app.use(cookieParser());
app.use(express.urlencoded());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', usersController.home);
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Blog is running on port: ', port);
    }
})