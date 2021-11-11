const mongoose= require('mongoose');
const env= require('./environment');

mongoose.connect(`mongodb+srv://${env.mongo_username}:${env.password}@cluster0.eiwh0.mongodb.net/${env.db}?retryWrites=true&w=majority`, {
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=> console.log('MongoDB connected....'))
.catch((err) => console.log(err));

const db= mongoose.connection;

db.on('error', console.error.bind(console, "Error"));

db.on('open', ()=>{
    console.log("Database is running...");
})
