const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    phone:{
        type:Number,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
  
    // image:{
    //     type:String,
    // }
   

},{timestamps:true})

module.exports=mongoose.model("user",UserSchema)