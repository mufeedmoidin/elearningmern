import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchCourse({ course, setFilteredSearch }) {

    const [search, setSearch] = useState('');


    const handleChange = (e) => {
        setSearch(e.target.value);

    }

    useEffect(() => {

        setFilteredSearch(course.filter((item) => {
            return (
                search !== '' ?
                    item.title.toLowerCase().includes(search.toLowerCase()) : course
            )
        }));
    }, [course,search])

    return (
        <Paper
            elevation={1}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton> */}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Course"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={handleChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton> */}
        </Paper>
    );
}
