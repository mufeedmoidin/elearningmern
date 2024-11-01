import { Box, Typography, Grid } from '@mui/material'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../images/banner-item-01.jpg';
import img2 from '../../images/banner-item-02.jpg';
import img3 from '../../images/banner-item-03.jpg';
import service1 from '../../images/service-01.png';
import service2 from '../../images/service-02.png';
import elearning from '../../images/elearning.svg';

export default function Home() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Autoplay speed in milliseconds (adjust as needed)
    };


    return (
        <div>
            <Box className='home-banner'>

                <Slider {...settings}>
                    <Box className='banner-slider'>
                        <img src={img1} alt="" />
                        <div className="banner-content">
                            <h1 className="banner-heading">Get the best result out of your effort</h1>
                            <p>Whether you want to learn a new skill, train your teams, or share what you know with the world, you are in the right place. As a leader in online learning, we’re here to help you achieve your goals and transform your life.</p>
                        </div>
                    </Box>
                    <Box className='banner-slider'>
                        <img src={img2} alt="" />
                        <div className="banner-content">
                            <h1 className="banner-heading">Skills are the key to unlocking potential</h1>
                            <p>Whether you want to learn a new skill, train your teams, or share what you know with the world, you are in the right place. As a leader in online learning, we’re here to help you achieve your goals and transform your life.</p>
                        </div>
                    </Box>
                    <Box className='banner-slider'>
                        <img src={img3} alt="" />
                        <div className="banner-content">
                            <h1 className="banner-heading">Creating impact around the world</h1>
                            <p>With our global catalog spanning the latest skills and topics, people and organizations everywhere are able to adapt to change and thrive.</p>
                        </div>
                    </Box>
                    <Box className='banner-slider'>
                        <img src={img1} alt="" />
                        <div className="banner-content">
                            <h1 className="banner-heading">Let’s build the future of education together</h1>
                            <p>Whether you want to learn a new skill, train your teams, or share what you know with the world, you’re in the right place. As a leader in online learning, we’re here to help you achieve your goals and transform your life.</p>
                        </div>
                    </Box>
                </Slider>
            </Box>

            <Box sx={{ padding: '66px 50px 50px 50px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
                    <Typography variant='body2' sx={{ mb: 2, fontWeight: '600', color: '#7a6ad8' }}>About Us</Typography>
                    <Typography variant='h5' sx={{ fontWeight: '600', mb: 3 }}>Welcome to E-Learning</Typography>
                </Box>
                <Box sx={{mb:4, display: 'flex', justifyContent: 'center', backgroundColor: '#f1f0fe', borderRadius: '20px' }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} md={5}>
                            <p style={{ fontSize: '15px', lineHeight: '28px', height: '#4a4a4a', textAlign: 'center', wordBreak: 'normal' }} >
                                At E-Learning, we are passionate believers that learning should be accessible to everyone, everywhere. Guided by the fundamental principle that knowledge knows no boundaries and should be freely shared, our mission is to provide unparalleled educational opportunities to empower individuals worldwide.
                            </p>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={elearning} alt="E-Learning" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
                    <Box sx={{ backgroundColor: '#f1f0fe', width: '230px', height: '300px', borderRadius: '20px', padding: '40px 30px 30px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                            Our Vision
                        </Typography>
                        <p style={{ fontSize: '15px', lineHeight: '28px', height: '#4a4a4a', textAlign: 'center', wordBreak: 'normal' }}>our vision is to be a global leader in online education, pioneering innovative learning experiences that empower individuals to excel in their personal and professional lives. </p>
                    </Box>


                    <Box sx={{ backgroundColor: '#f1f0fe', width: '230px', height: '300px', borderRadius: '20px', padding: '40px 30px 30px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                            Our Mission
                        </Typography>
                        <p style={{ fontSize: '15px', lineHeight: '28px', height: '#4a4a4a', textAlign: 'center', wordBreak: 'normal' }}>We strive to empower individuals of all ages and backgrounds by providing them with accessible, flexible, and engaging learning opportunities.  </p>
                    </Box>


                    <Box sx={{ backgroundColor: '#f1f0fe', width: '230px', height: '300px', borderRadius: '20px', padding: '40px 30px 30px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                            Our Aim
                        </Typography>
                        <p style={{ fontSize: '15px', lineHeight: '28px', height: '#4a4a4a', textAlign: 'center', wordBreak: 'normal' }}>To provide high-quality educational content curated by industry experts and experienced educators, ensuring relevance and rigor in every course offered. </p>
                    </Box>

                </Box>




            </Box>
        </div>
    )
}
