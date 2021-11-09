const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/users_db');

const db= mongoose.connection;

db.on('error', console.error.bind(console, "Error"));

db.on('open', ()=>{
    console.log("Database is running...");
})
