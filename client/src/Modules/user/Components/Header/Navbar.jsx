import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate, Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import Popover from '@mui/material/Popover';
import Chip from '@mui/material/Chip';
import CategoryCourse from '../pages/CategoryCourse';


const pages = [
    { page: 'Home', path: '/' },
    { page: 'Category', path: '/category' },
    { page: 'Courses', path: '/all-course' },
    // { page: 'About', path: '/about' },
    { page: 'Status', path: '/course-status' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({ token, count, setCount }) {
    const host = "http://127.0.0.1:5000";

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState({});
    const [courseCategory, setCourseCategory] = useState([]);
    const [catCount, setCatCount] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setCount(!count);
        navigate('/');
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleNavigate = (page, path, event) => {
        if (page === 'Category') {
            handleClick(event);
        } else {
            navigate(path);
        }
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCategoryNav = (category) => {
        navigate(`/category-course/${category}`)
        setCatCount(!count);
        handleClose();
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));

        axios.get(`${host}/api/user/get-single-user`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                console.log("Get all user response : " + JSON.stringify(res.data))
                setUser(res.data)
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    }, [])

    // useEffect(() => {
    //     axios.get(`${host}/api/admin/getcourse`)
    //         .then((res) => {
    //             console.log(res.data, 'category')
    //             setCourseCategory(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [catCount])

    useEffect(() => {
        axios.get(`${host}/api/admin/getcourse`)
            .then((res) => {
                console.log(res.data, 'category')
                // Remove duplicate categories
                const uniqueCategories = [...new Set(res.data.map(course => course.category))];
                setCourseCategory(uniqueCategories);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [catCount])

    console.log(courseCategory, 'jjjj')

    return (
        <>
            <AppBar elevation={0}
                position="fixed"
                className={scrolled ? 'navbar scrolled' : 'navbar'}
                sx={{
                    backgroundColor: '#7a6ad8 !important',
                    borderBottomRightRadius: '23px',
                    borderBottomLeftRadius: '23px',
                    // transition: 'all 0.3s ease',
                }}
            >
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '30px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            E-Learning
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {/* {pages?.map((i) => (
                                    <MenuItem key={i.page} onClick={(event) => { handleCloseNavMenu(); handleNavigate(i.page, i.path, event); }}>
                                        <Typography textAlign="center">{i.page}</Typography>
                                    </MenuItem>
                                ))} */}

                                {pages.map((i) => (
                                    // Check if the page is 'Status' and user is logged in
                                    (i.page == 'Status' && !token) ? null : (
                                        <MenuItem key={i.page} onClick={(event) => { handleCloseNavMenu(); handleNavigate(i.page, i.path, event); }}>
                                            <Typography textAlign="center">{i.page}</Typography>
                                        </MenuItem>
                                    )
                                ))}
                            </Menu>
                        </Box>
                        <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '30px' }} />

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            E-Learning
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '10px' }}>
                            {pages.map((i) => (
                                (i.page === 'Status' && !token) ? null : (
                                    <Typography
                                        key={i.page}
                                        onClick={(event) => {
                                            handleCloseNavMenu();
                                            handleNavigate(i.page, i.path, event);
                                        }}
                                        sx={{ my: 2, cursor: 'pointer' }}
                                        className='navItemList'
                                    >
                                        {i.page}
                                    </Typography>
                                )
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {/* <Tooltip title="Open settings"> */}
                            {token ?
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography>Hi,{user?.name}</Typography>
                                        <Divider orientation="vertical" flexItem sx={{ height: '24px', mx: 1, backgroundColor: 'white' }} />
                                    </Box>

                                    <Button variant='' size='small' onClick={handleLogout} startIcon={<LogoutIcon sx={{ fontSize: '12px' }} />} sx={{ fontSize: '12px' }}>Logout</Button>
                                </Box>

                                :

                                <Link to='/login' sx={{ color: 'white', textDecoration: 'none' }}><Button variant='' size='small' startIcon={<LoginIcon sx={{ fontSize: '14px', color: 'white' }} />} sx={{ fontSize: '14px', color: 'white' }}>Login</Button>
                                </Link>
                            }
                            {/* </Tooltip> */}
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{ width: '90%' }}
                >
                    <Box sx={{ padding: '0px 20px' }}>
                        <p style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: '500', marginBottom: '-8px' }}>Checkout course based on category</p>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', p: 2, gap: '10px', justifyContent: 'center' }}>
                        {courseCategory?.map((category, index) => (
                            <Chip key={index} label={category} onClick={() => handleCategoryNav(category)} sx={{ color: '#6a4ad3', backgroundColor: '#e1d8fe' }} />
                        ))}
                    </Box>
                </Popover>
            </AppBar>
            <div style={{ paddingTop: '64px' }}> {/* Adjust padding to match navbar height */}
                {/* Main content of the page */}
            </div>
        </>
    );
}

export default Navbar;
