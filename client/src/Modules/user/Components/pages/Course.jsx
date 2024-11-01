import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import errorimg from '../../images/err3.avif';
import SearchCourse from './SearchCourse';
import axios from 'axios';
import { Link } from 'react-router-dom';




export default function Course() {

    const host = "http://127.0.0.1:5000";


    const [course, setCourse] = useState([]);
    const [filteredSearch, setFilteredSearch] = useState([]);


    useEffect(() => {
        axios.get(`${host}/api/admin/getcourse`)
            .then((res) => {
                console.log(res.data)
                setCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [course])


    return (
        <div style={{ padding: '20px' }}>
            <Box sx={{ paddingTop: '50px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
                <Typography variant='body2' sx={{mb:3, fontWeight: '600', color: '#7a6ad8' }}>All Courses</Typography>
                <Typography variant='h4' sx={{ fontWeight: '600' }}>Checkout all the available courses</Typography>
            </Box>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <SearchCourse course={course} setFilteredSearch={setFilteredSearch} />
            </Box>

            <Box sx={{ padding: '50px 50px 50px 50px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                {filteredSearch.length > 0 ?

                    filteredSearch?.map((item) => (


                        <Box sx={{
                            backgroundColor: '#f1f0fe', width: '350px', borderRadius: '20px', transition: '0.3s ease',
                            '&:hover': {
                                // backgroundColor: '#e0e0e0',
                                transition: 'transform 0.3s ease',

                                transform: 'scale(1.05)',

                            }
                        }}>
                            <Link to={`/course-description/${item._id}`}>
                                <img src={`http://localhost:5000/api/image/${item?.thumbnail}`} alt="" style={{ width: '350px', height: '280px', borderRadius: '30px' }} />
                            </Link>
                            <Box sx={{ padding: '14px 20px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#7a6ad8' }}>
                                        {item.category}
                                    </Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '500', color: 'white', background: '#7a6ad8', padding: '1px 6px', borderRadius: '5px', fontWeight: '600' }}>
                                    ₹ {item.price}   
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: '600', mt: 1 }}>
                                    {item.title}

                                </Typography>
                            </Box>
                        </Box>


                    ))
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={errorimg} alt="" style={{ width: '300px' }} />
                        <Typography>No Search Found </Typography>
                    </Box>

                }













            </Box>
        </div >
    )
}
