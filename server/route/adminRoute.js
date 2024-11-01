const express=require('express');
const router=express.Router();
const multer = require('multer')
const upload = require('../middleware/upload'); // Adjust the path as necessary


const {InsertCourse,GetCourse,GetSingleCourse,UpdateCourse,DeleteCourse} =require('../adminController/courseController');
const {AdminLogin}=require('../adminController/AdminLogin');



// router.post('/insertcourse',upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'chapters[0][content]', maxCount: 1 },]),InsertCourse);
router.post('/insertcourse', upload.any(), InsertCourse);
router.get('/getcourse', GetCourse);
router.get('/getSingleCourse/:id', GetSingleCourse);
router.put('/updatecourse/:id', upload.single('thumbnail'),UpdateCourse);
router.delete('/deleteCourse/:id', DeleteCourse);

router.post('/adminLogin',AdminLogin);


module.exports=router;
