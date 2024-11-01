import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, List, ListItem, Checkbox } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Confetti from 'react-confetti';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Swal from 'sweetalert2';



const ViewCourse = () => {
    const host = "http://127.0.0.1:5000";
    const { id } = useParams();
    const nav = useNavigate();
    const [chapters, setChapters] = useState([]);
    const [currentChapter, setCurrentChapter] = useState(null);
    const [checkedChapters, setCheckedChapters] = useState([]);
    const [isCourseCompleted, setIsCourseCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiPieces, setConfettiPieces] = useState(500);
    const [feedback, setFeedback] = useState({});
    const [errors, setErrors] = useState({});


    useEffect(() => {

    })
    const tokensss = JSON.parse(localStorage.getItem('userToken'));
    const userId = tokensss && tokensss.user && tokensss.user.id; // Assuming the token contains the user info

    console.log(tokensss, 'ttt')

    useEffect(() => {
        axios.get(`${host}/api/admin/getSingleCourse/${id}`)
            .then((res) => {
                const chapters = res.data.chapters;
                setChapters(chapters);
                const lastPlayedChapter = localStorage.getItem(`lastPlayedChapter_${id}_${tokensss}`);
                if (lastPlayedChapter) {
                    setCurrentChapter(chapters[Number(lastPlayedChapter)]);
                } else {
                    setCurrentChapter(chapters[0]);
                }
                const savedCheckedChapters = JSON.parse(localStorage.getItem(`checkedChapters_${id}_${tokensss}`)) || [];
                setCheckedChapters(savedCheckedChapters);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id, userId]);




    // useEffect(() => {
    //     axios.get(`${host}/api/admin/getSingleCourse/${id}`)
    //         .then((res) => {
    //             const chapters = res.data.chapters;
    //             setChapters(chapters);
    //             const lastPlayedChapter = localStorage.getItem(`lastPlayedChapter_${id}`);
    //             if (lastPlayedChapter) {
    //                 setCurrentChapter(chapters[Number(lastPlayedChapter)]);
    //             } else {
    //                 setCurrentChapter(chapters[0]);
    //             }
    //             const savedCheckedChapters = JSON.parse(localStorage.getItem(`checkedChapters_${id}`)) || [];
    //             setCheckedChapters(savedCheckedChapters);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [id]);

    const handleChapterClick = (index) => {
        setCurrentChapter(chapters[index]);
        localStorage.setItem(`lastPlayedChapter_${id}_${tokensss}`, index);
    };

    // const handleChapterClick = (index) => {
    //     setCurrentChapter(chapters[index]);
    //     localStorage.setItem(`lastPlayedChapter_${id}`, index);
    // };

    const handleCheckboxChange = (chapterIndex, title) => async (event) => {
        let updatedCheckedChapters = [...checkedChapters];
        if (event.target.checked) {
            updatedCheckedChapters.push({ index: chapterIndex, title });
        } else {
            updatedCheckedChapters = updatedCheckedChapters.filter(
                chapter => chapter.index !== chapterIndex
            );
        }
        setCheckedChapters(updatedCheckedChapters);
        // localStorage.setItem(`checkedChapters_${id}`, JSON.stringify(updatedCheckedChapters));
        localStorage.setItem(`checkedChapters_${id}_${tokensss}`, JSON.stringify(updatedCheckedChapters));


        // Send the updated checked chapters to the backend
        try {
            const tokensss = JSON.parse(localStorage.getItem('userToken'));
            await axios.put(`${host}/api/user/updateCheckedChapters`, {
                courseId: id,
                checkedChapters: updatedCheckedChapters
            }, { headers: { 'auth-token': tokensss } });
        } catch (error) {
            console.log("Error updating checked chapters:", error);
        }
        // Check if course is completed
        checkCourseCompletion(chapters, updatedCheckedChapters);
    };
    const checkCourseCompletion = (chapters, checkedChapters) => {
        const isCompleted = chapters.length === checkedChapters.length;
        if (isCompleted) {
            setShowConfetti(true);
            Swal.fire({
                title: "Congratulations!",
                html: "You have successfully completed the course!<br/>Click the button below to download your certificate of completion",

                // text: "You have successfully completed the course! <br/ >Click the button below to download your certificate of completion",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "View Certificate"
            }).then((result) => {
                // Check if the user clicked the "Status" button
                if (result.dismiss === Swal.DismissReason.cancel) {
                    // Redirect to another status page
                    nav(`/certificate/${id}`);
                }
            });
            setConfettiPieces(500); // Start with 500 pieces
            setTimeout(() => {
                // Gradually reduce confetti pieces over time
                const interval = setInterval(() => {
                    setConfettiPieces(prev => {
                        if (prev <= 0) {
                            clearInterval(interval);
                            setShowConfetti(false);
                            return 0;
                        }
                        return prev - 200; // Reduce 50 pieces every interval
                    });
                }, 800); // Decrease every 100ms
            }, 5000); // Start decreasing after 2 seconds
        }
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = feedback.name ? "" : "Name is required.";
        tempErrors.email = feedback.email ? "" : "Email is required.";
        tempErrors.message = feedback.message ? "" : "Message is required.";

        if (feedback.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            tempErrors.email = emailRegex.test(feedback.email) ? "" : "Email is not valid.";
        }


        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });

    }

    console.log(feedback, 90)

    const handleSubmit = () => {
        if (validate()) {
            const tokensss = JSON.parse(localStorage.getItem('userToken'));

            axios.post(`${host}/api/user/feedback/${id}`, feedback, { headers: { 'auth-token': tokensss } })
                .then((res) => {
                    Swal.fire({
                        title: "Submitted!",
                        html: "Thank you for giving us your feedback.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    setFeedback({ name: '', email: '', message: '' }); // Clear the form
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
    return (
        <>
            {/* {showConfetti && <Confetti numberOfPieces={confettiPieces} />} */}
            {showConfetti && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 9999, 
                        pointerEvents: 'none', 
                    }}
                >
                    <Confetti numberOfPieces={confettiPieces} />
                </Box>
            )}
{/* 
            {showConfetti && (
                <>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 9999,
                            pointerEvents: 'none',
                        }}
                    >
                        <Confetti
                            numberOfPieces={confettiPieces}
                            gravity={0.5}
                            initialVelocityY={-10} 
                            initialVelocityX={{ min: -10, max: 10 }} 
                            origin={{ x: 2, y: 1 }} 
                        />
                    </Box>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 9999,
                            pointerEvents: 'none',
                        }}
                    >
                        <Confetti
                            numberOfPieces={confettiPieces}
                            gravity={0.5}
                            initialVelocityY={-10} 
                            initialVelocityX={{ min: -10, max: 10 }} 
                            origin={{ x: 1, y: 2 }} 
                        />
                    </Box>
                </>
            )} */}




            <Box sx={{ flexGrow: 1, p: 2 }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} >
                        <Card>
                            <CardMedia>
                                <div style={{ maxWidth: '100%', height: 'auto' }}>
                                    {currentChapter && (
                                        <iframe
                                            width="100%"
                                            height="480"
                                            src={`https://www.youtube.com/embed/${currentChapter.content}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={currentChapter.title}
                                            style={{ borderRadius: '10px' }}
                                        ></iframe>
                                    )}
                                </div>
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ fontSize: '1.6rem', mb: 2 }}>
                                    {currentChapter ? currentChapter.title : 'Loading...'} Data Structure and Algorithm
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ fontSize: '1.3rem', marginBottom: '-10px' }}>
                                    Course Description
                                </Typography>
                                <p style={{ fontWeight: 400, lineHeight: 1.4, color: 'gray' }}>
                                    {currentChapter ? currentChapter.description : 'Loading...'}
                                    
                                    <br></br>With our online learning platform, you have the power to unlock new skills and knowledge that can transform your life and career. <br></br>Embrace the flexibility to learn at your own pace, whenever and wherever you want.<br></br>
                                    Gain insights and practical skills from industry experts and top instructors. Our comprehensive courses are designed to provide you with real-world knowledge that you can apply immediately.<br></br>
                                    Stand out in the competitive job market by acquiring in-demand skills and certifications. Whether you are looking to advance in your current role or explore new opportunities, our platform will help you achieve your professional goals.


                                </p>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Box sx={{ maxHeight: 600, overflow: 'auto', position: 'relative' }}>
                            <Box sx={{
                                p: 2,
                                background: 'black',
                                color: 'white',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1000,
                                textAlign: 'center',
                                borderBottom: '1px solid #ccc',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500 }}>Course Contents</Typography>
                            </Box>
                            <List>
                                {chapters.map((chapter, index) => (
                                    <>
                                        <ListItem
                                            key={index}
                                            sx={{
                                                backgroundColor: currentChapter === chapter ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
                                            }}
                                        >
                                            <Card sx={{ width: '100%' }}>
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            {chapters.length === checkedChapters.length ? <TaskAltIcon sx={{ color: 'green' }} /> :
                                                                <Checkbox
                                                                    checked={checkedChapters.some(chapter => chapter.index === index)}
                                                                    onChange={handleCheckboxChange(index, chapter.title)}
                                                                />
                                                            }
                                                            <Box sx={{ display: 'flex', gap: '20px', cursor: 'pointer' }} onClick={() => handleChapterClick(index)}>
                                                                <Box sx={{ display: 'flex', gap: '5px' }}>
                                                                    <OndemandVideoIcon sx={{ fontSize: '30px' }} />
                                                                    <Typography variant="body1" component="div" sx={{ fontWeight: '400' }}>
                                                                        Chapter-{index + 1}
                                                                    </Typography>
                                                                </Box>

                                                            </Box>

                                                        </Box>
                                                        <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={() => handleChapterClick(index)}>
                                                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '14px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                                                {chapter.title}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </ListItem>



                                    </>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8} >
                        <Card sx={{ mt: 2 }} elevation={0}>

                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ fontSize: '1.6rem', mb: 2, color: '#7a6ad8' }}>
                                    Write down your feedback.
                                </Typography>

                                <div className="contact-form">
                                    <div>
                                        <input type="text" name='name' onChange={handleChange} placeholder="Your Name..." className="input-field" value={feedback.name} />
                                        {errors.name && <div className="error" style={{ color: 'orange' }}>{errors.name}**</div>}



                                        <input type="email" name='email' onChange={handleChange} placeholder="Your E-mail..." className="input-field" value={feedback.email} />
                                        {errors.email && <div className="error" style={{ color: 'orange' }}>{errors.email}**</div>}


                                        <textarea type="password" name='message' onChange={handleChange} placeholder="Your Message..." className="input-field" value={feedback.message}></textarea>
                                        {errors.message && <div className="error" style={{ color: 'orange' }}>{errors.message}**</div>}



                                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ViewCourse;
