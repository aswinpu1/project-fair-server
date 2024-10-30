const mongoose= require('mongoose')
const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log("MongoDb Atlas connected succesfully with Pfserver");
    
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    
    
})