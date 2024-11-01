import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qrimg from '../../images/qr_codejpg.jpg';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Typography, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import PaymentIcon from '@mui/icons-material/Payment';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ShopIcon from '@mui/icons-material/Shop';
import Testimonial from './Testimonial';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '20px',
    // p: 4,
};



const CourseDescription = () => {


    const host = "http://127.0.0.1:5000";
    const { id } = useParams();
    const nav = useNavigate();
    const [singleCourse, setSingleCourse] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState({});
    const [purschased, setPurchased] = useState(false);
    const [feedbackData, setFeedbackData] = useState([]);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get(`${host}/api/admin/getSingleCourse/${id}`)
            .then((res) => {
                const chapters = res.data;
                console.log(res.data.roadmap, 'road');
                setSingleCourse(chapters);

            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    console.log(singleCourse.roadmap, 6767)

    const handleChangePayment = (e) => {
        setPaymentDetails({ [e.target.name]: e.target.value, course_id: id })
        setErrors({
            [e.target.name]: ""
        });
    }


    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!paymentDetails.transactionId) {
            newErrors.transactionId = 'Transaction Id is required';
            isValid = false;
        }

        
        setErrors(newErrors);
        return isValid;
    }

    const handlePay = () => {

        if (!validateForm()) {
            return;
        }

        const tokensss = JSON.parse(localStorage.getItem('userToken'));



        axios.post(`${host}/api/user/course-payment`, paymentDetails, { headers: { 'auth-token': tokensss } })
            .then((response) => {
                console.log("Insert Response : " + response.data.name);
                if (response.data) {
                    Swal.fire({
                        title: "Payment Successful",
                        text: "Thank you for buying a course.",
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Status"
                    }).then((result) => {
                        // Check if the user clicked the "Status" button
                        if (result.dismiss === Swal.DismissReason.cancel) {
                            // Redirect to another status page
                            nav('/course-status');
                        }
                    });
                    setOpen(false);
                } else {
                    console.log("Some error occurred");
                }
            })
            .catch((err) => {
                console.log("Error : " + err);
            });
    }


    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));

        axios.get(`${host}/api/user/get-bookings`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                const chapters = res.data;
                const hasPurchased = chapters.some((i) => i.course_id === id);
                setPurchased(hasPurchased);

            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {

        axios.get(`${host}/api/user/get-feedback`)
            .then((res) => {

                setFeedbackData(res.data);

            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    console.log(feedbackData.length, 8787)

    return (
        <div style={{ padding: '30px' }}>
            <div className="card">
                {purschased ?

                    <div className="" >
                        <Link to={`/view-course/${id}`} style={{ textDecoration: 'none',  }} className="top-right-link">
                            {/* <span className="" onClick={handleOpen}>See Chapters </span> */}
                            <Button variant='' color='grey' endIcon={<TaskAltIcon />} size='small'>See Chapters</Button>
                        </Link>
                    </div>
                    :
                    <div className="top-right-link2">
                        <Button variant='' color='success' onClick={handleOpen} startIcon={<ShopIcon />} >Choose this course</Button>

                        {/* <span className="arrow" onClick={handleOpen}>Buy ➔</span> */}
                    </div>
                }
                <div className="image-container">
                    <img src={`http://localhost:5000/api/image/${singleCourse?.thumbnail}`} alt="Workshop" />
                </div>
                <div className="content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div className="tag" style={{ textAlign: 'center' }}>{singleCourse?.category}</div>
                        <h2 className="title ">{singleCourse?.title}</h2>
                    </div>
                    <div className="details">
                        <div className="detail-item">
                            <span className="label">Level of Course:</span>
                            <span className="value">{singleCourse?.level}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Total Chapters:</span>
                            <span className="value">{singleCourse?.chapters?.length}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Price:</span>
                            <span className="value">₹{singleCourse?.price}</span>
                        </div>
                    </div>
                </div>


            </div>

            <Box className="card2" sx={{ mt: 3, p: 2 }}>
                <h3>Course Descripiton</h3>
                <p>{singleCourse?.description}


                </p>

                <h3>Course Roadmap</h3>
                <ul>
                    {
                        // (singleCourse?.roadmap?.length > 0 && singleCourse?.roadmap?.length <= 1) ?

                        //     singleCourse?.roadmap?.map((i) => (
                        //         <>
                        //             <li><Typography variant='h6'>{i.roadmap}</Typography></li>


                        //         </>
                        //     ))
                        //     :
                        singleCourse?.roadmap?.map((i) => (
                            <>
                                <li><Typography variant='body1'>{i.roadmap}</Typography></li>
                            </>
                        ))
                    }
                </ul>

            </Box>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box className="payment-tag" >
                        <PaymentIcon sx={{ fontSize: '40px' }} />

                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                            Make a Payment
                        </Typography>
                    </Box>
                    <Box sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={qrimg} alt="" style={{ width: '200px' }} />
                            <p>Enter Transaction Id</p>
                            <TextField variant='outlined' name='transactionId' onChange={handleChangePayment} fullWidth size='small' placeholder='Transaction Id' error={!!errors.transactionId}
                            helperText={errors.transactionId    } />

                            <Button variant='outlined' sx={{ mt: 3 }} onClick={handlePay} fullWidth size='small' color='primary'>Submit</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>


            <Box>
                {feedbackData.length > 0 &&
                    <Testimonial feedbackData={feedbackData} />
                }
            </Box>
        </div >
    );
};

export default CourseDescription;
