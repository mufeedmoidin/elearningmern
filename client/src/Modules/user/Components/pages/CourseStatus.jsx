import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CircularProgressWithLabel from './CircularProgressWithLabel'; // Adjust the path as needed
import Tooltip from '@mui/material/Tooltip';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import nocontentimg from '../../images/nocontent.webp';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '20px',
};

const CourseStatus = () => {
    const host = "http://127.0.0.1:5000";
    const { id } = useParams();
    const nav = useNavigate();
    const [courseStatus, setCourseStatus] = useState([]);

    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));

        axios.get(`${host}/api/user/get-detailed-bookings`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                const chapters = res.data;
                setCourseStatus(chapters);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const calculateProgress = (checkedChapters, totalChapters) => {
        if (!Array.isArray(checkedChapters) || !Array.isArray(totalChapters)) {
            return 0;
        }

        const checkedLength = checkedChapters.length;
        const totalLength = totalChapters.length;

        if (totalLength === 0) {
            return 0;
        }

        return (checkedLength / totalLength) * 100;
    };


    console.log(courseStatus, 8888)

    return (
        <div style={{ padding: '30px' }}>
            <Box sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
                <Typography variant='body2' sx={{ mb: 3, fontWeight: '600', color: '#7a6ad8' }}>All Courses</Typography>
                <Typography variant='h4' sx={{ mb: 3, fontWeight: '600',fontSize:{xs:'19px' ,md:'30px'} }}>Checkout all your courses</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>

                {courseStatus.length > 0 ?

                    courseStatus?.map((item) => (
                        <div className="card" key={item?.course_id?._id}>
                            <Box>
                                <Link to={`/view-course/${item?.course_id?._id}`} className="top-right-link">
                                    <Tooltip title="View Chapters">
                                        <Button variant='outlined' size='small'>
                                            <MenuBookIcon />
                                        </Button>
                                    </Tooltip>
                                </Link>
                                {item?.checkedChapters?.length === item?.course_id?.chapters?.length &&
                                    <Link to={`/certificate/${item?.course_id?._id}`} className="top-right-link3">
                                        <Tooltip title="View Certificate">

                                            <Button variant='outlined' color='success' size='small'>
                                                <WorkspacePremiumIcon />
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                }
                            </Box>

                            <div className="image-container">
                                <img src={`http://localhost:5000/api/image/${item?.course_id?.thumbnail}`} alt="Workshop" />
                            </div>

                            <div className="content">
                                <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                                    <div className="tag" style={{ textAlign: 'center' }}>{item?.course_id?.category}</div>
                                    <p className="" style={{ fontSize: '20px', fontWeight: '500' }}>{item?.course_id?.title}</p>
                                </div>

                                <div className="details">
                                    <div className="detail-item">
                                        <span className="label">Level of Course:</span>
                                        <span className="value">{item?.course_id?.level}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Total Chapters:</span>
                                        <span className="value">{item?.course_id?.chapters?.length}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Price:</span>
                                        <span className="value">₹{item?.course_id?.price}</span>
                                    </div>
                                    <div >
                                        <div className="detail-item">
                                            <span className="label">Progress:</span>
                                            <span className="value">
                                                <CircularProgressWithLabel
                                                    value={calculateProgress(item?.checkedChapters, item?.course_id?.chapters)}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <Box sx={{ color: 'gray' }}>
                        <p style={{ textAlign: 'center' }}>No course available</p>
                        <img src={nocontentimg} alt="" style={{marginTop:'-100px'}}/>
                    </Box>

                }

            </Box>
        </div>
    );
};

export default CourseStatus;


