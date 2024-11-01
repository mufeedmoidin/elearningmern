const mongoose=require('mongoose')


const BookingSchema=new mongoose.Schema({
   
    paid_amount:{
        type:Number,
        // required:true
    },
    transactionid:{
        type:String,
        // required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    },
    checkedChapters:[]
   

},{timestamps:true})

module.exports=mongoose.model("booking",BookingSchema)