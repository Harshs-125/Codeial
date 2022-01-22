const mongoose=require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb+srv://admin-Harsh:mysispalak@cluster0.22ht8.mongodb.net/${env.db}?retryWrites=true&w=majority`);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to mongodb"));

db.once('open',function(){
    console.log("Connected to database successfully:mongodb");
});
module.exports=db;