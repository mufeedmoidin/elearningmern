import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, List, ListItem, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const ViewCourse = () => {
    const host = "http://127.0.0.1:5000";
    const { id } = useParams();
    const [chapters, setChapters] = useState([]);
    const [currentChapter, setCurrentChapter] = useState(null);
    const [checkedCourse, setCheckedCourse] = useState({});

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        axios.get(`${host}/api/admin/getSingleCourse/${id}`)
            .then((res) => {
                const chapters = res.data.chapters;
                setChapters(chapters);
                const lastPlayedChapter = localStorage.getItem(`lastPlayedChapter_${id}`);
                if (lastPlayedChapter) {
                    setCurrentChapter(chapters[Number(lastPlayedChapter)]);
                } else {
                    setCurrentChapter(chapters[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id]);

    const handleChapterClick = (index) => {
        setCurrentChapter(chapters[index]);
        localStorage.setItem(`lastPlayedChapter_${id}`, index);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
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
                            <Typography variant="h5" component="div" sx={{ fontSize: '1,6rem', mb: 2 }}>
                                {currentChapter ? currentChapter.title : 'Loading...'}Data Structure and Algorithm
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ fontSize: '1.3rem', marginBottom: '-10px' }}>
                                Course Description
                            </Typography>
                            <p style={{ fontWeight: 400, lineHeight: 1.4, color: 'gray' }}>
                                {currentChapter ? currentChapter.description : 'Loading...'}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum eaque magnam ullam cum, officiis porro incidunt labore nesciunt numquam delectus impedit voluptates perspiciatis, fugit, ipsum adipisci aperiam! Consequatur, corrupti!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum eaque magnam ullam cum, officiis porro incidunt labore nesciunt numquam delectus impedit voluptates perspiciatis, fugit, ipsum adipisci aperiam! Consequatur, corrupti!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum eaque magnam ullam cum, officiis porro incidunt labore nesciunt numquam delectus impedit voluptates perspiciatis, fugit, ipsum adipisci aperiam! Consequatur, corrupti!
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
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Checkbox onChange={handleChange} />

                                                    <Box sx={{ display: 'flex', gap: '20px', cursor: 'pointer' }} onClick={() => handleChapterClick(index)}>

                                                        <Box sx={{ display: 'flex', gap: '5px' }}>
                                                            <OndemandVideoIcon sx={{ fontSize: '30px' }} />
                                                            <Typography variant="body1" component="div" sx={{ fontWeight: '400' }}>
                                                                ch{index + 1}:
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '15px', fontWeight: '600' }}>
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
            </Grid>
        </Box>
    );
};

export default ViewCourse;
