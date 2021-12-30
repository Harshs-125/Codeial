const mongoose=require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost:27017/${env.db}`);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to mongodb"));

db.once('open',function(){
    console.log("Connected to database successfully:mongodb");
});
module.exports=db;