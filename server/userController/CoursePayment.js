const bookingSchema=require('../model/booking');



const BookingInsert=async(req,res)=>{
    try{
        console.log(req.body,'insert')
        const {transactionId,course_id}=req.body;

        const bookingInfo=new bookingSchema({transactionid:transactionId,course_id,user_id:req.user});
        const bookingSaved=await bookingInfo.save();
        res.send(bookingSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error occured");
    }
}

const GetBooking = async (req, res) => {
    try {
        const booking= await bookingSchema.find({user_id:req.user});
        console.log(booking)
        res.send(booking);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

const GetDetailedBooking = async (req, res) => {
    try {
        const booking= await bookingSchema.find({user_id:req.user}).populate('course_id').populate('user_id');
        console.log(booking)
        res.send(booking);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}
const GetAllBooking = async (req, res) => {
    try {
        const booking= await bookingSchema.find().populate('course_id').populate('user_id');
        console.log(booking)
        res.send(booking);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}


const UpdateCheckedChapter = async (req, res) => {
    const { userId, courseId, checkedChapters } = req.body;

    try {
        const result = await bookingSchema.findOneAndUpdate(
            { user_id: req.user, course_id: courseId },
            { $set: { checkedChapters: checkedChapters } },
            { new: true, upsert: true } // upsert creates the document if it doesn't exist
        );
        res.json({ message: 'Checked chapters updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating checked chapters', error });
    }
}



const Sales= async (req, res) => {
    try {
        const salesData = await bookingSchema.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    sales: { $sum: 1 } // Count the number of sales per day
                }
            },
            { $sort: { _id: 1 } } // Sort by date ascending
        ]);

        res.json(salesData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


module.exports={BookingInsert,GetBooking,GetDetailedBooking,UpdateCheckedChapter,GetAllBooking,Sales}
