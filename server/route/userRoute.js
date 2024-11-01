

const express=require('express');
const router=express.Router();
const multer = require('multer')
const upload = require('../middleware/upload'); // Adjust the path as necessary
const middleware = require('../middleware/middleware'); // Adjust the path as necessary


const {UserRegister,UserLogin,GetOneUser,GetUser} =require('../userController/RegisterLogin');
const {BookingInsert,GetBooking,GetDetailedBooking,UpdateCheckedChapter,GetAllBooking,Sales}=require('../userController/CoursePayment');
const {FeedbackInsert,GetFeedback,GetDetailedFeedback}=require('../userController/Feedback');


//user regiger/Login
router.post('/user-register', UserRegister);
router.post('/user-login', UserLogin);
router.get('/get-single-user',middleware,GetOneUser);
router.get('/get-user',GetUser);


//Course Booking
router.post('/course-payment',middleware,BookingInsert);
router.get('/get-bookings',middleware,GetBooking);
router.get('/get-all-bookings',GetAllBooking);
router.get('/sales',Sales);
router.get('/get-detailed-bookings',middleware,GetDetailedBooking);
router.put('/updateCheckedChapters',middleware,UpdateCheckedChapter);

//Feedback
router.post('/feedback/:id',middleware,FeedbackInsert);
router.get('/get-feedback',GetFeedback);
router.get('/get-detailed-feedback',GetDetailedFeedback);


module.exports=router;
