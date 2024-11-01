import React from 'react';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/Testimonial.css';

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
    <div className="slick-arrow2 slick-next2" onClick={onClick}>
        &#9654; {/* Right arrow symbol */}
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div className="slick-arrow2 slick-prev2" onClick={onClick}>
        &#9664; {/* Left arrow symbol */}
    </div>
);

const Testimonial = ({ feedbackData }) => {
    const settings = {
        dots: false, // Disable dots
        infinite: feedbackData.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: feedbackData.length > 1,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div>
            <Box sx={{ padding: '50px' }}>
                <Box sx={{ paddingTop: '50px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mb: 3 }} >
                    <Typography variant='body2' sx={{ mb: 2, fontWeight: '600', color: '#7a6ad8' }}>TESTIMONIALS</Typography>
                    <Typography variant='h4' sx={{ fontWeight: '600' }}>What They Say About Us?</Typography>
                </Box>
                <Slider {...settings}>
                    {feedbackData.map((item, index) => (
                        <Box key={index} className='feedback-slider'>
                            <div className="feedback-content">
                                {/* <img src={item.image} alt={`${item.name}`} className="feedback-image" /> */}
                                <Typography variant="h6" className="feedback-name">_{item.name}_</Typography>
                                <Typography variant="body1" className="feedback-text">" {item.message} "</Typography>
                            </div>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </div>
    );
}

export default Testimonial;
