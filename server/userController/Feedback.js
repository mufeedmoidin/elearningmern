const feedbackSchema=require('../model/Feedback');



const FeedbackInsert=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {name,email,message}=req.body;

        const feedInfo=new feedbackSchema({name,email,message,course_id:req.params.id,user_id:req.user});
        const feedbackSaved=await feedInfo.save();
        res.send(feedbackSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}


const GetFeedback = async (req, res) => {
    try {
        const feedback= await feedbackSchema.find();
        console.log(feedback)
        res.send(feedback);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}
const GetDetailedFeedback = async (req, res) => {
    try {
        const feedback= await feedbackSchema.find().populate('course_id');
        console.log(feedback)
        res.send(feedback);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

module.exports={FeedbackInsert,GetFeedback,GetDetailedFeedback}
