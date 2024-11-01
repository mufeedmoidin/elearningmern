import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CommentIcon from '@mui/icons-material/Comment';
import SchoolIcon from '@mui/icons-material/School';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navigation() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('');

  const nav=useNavigate();


  const handleLogout=()=>{
      localStorage.removeItem('adminToken');
      nav('/admin/login');
  }

  useEffect(() => {
    const currentRoute = location.pathname;

    if (currentRoute.includes('/admin/manage-course')) {
      setActiveItem('Manage Course');
    } else if (currentRoute.includes('/admin/add-course')) {
      setActiveItem('Manage Course');
    } else if (currentRoute.includes('/admin/view-chapter/')) {
      setActiveItem('Manage Course');
    } else if (currentRoute.includes('/admin/update-course/')) {
      setActiveItem('Manage Course');
    } else if (currentRoute.includes('/admin/view-user')) {
      setActiveItem('View User');
    } else if (currentRoute.includes('/admin/view-feedback')) {
      setActiveItem('Feedback');
    } else if (currentRoute.includes('/admin/view-purchase')) {
      setActiveItem('View Purchase');
    } else if (currentRoute.includes('/admin/')) {
      setActiveItem('Dashboard');
  
    } else {
      setActiveItem('');
    }
  }, [location.pathname]);

  const sideBarList = [
    { title: 'Dashboard', path: '/admin/', icon: <DashboardIcon sx={{ fontSize: '14px' }} /> },
    { title: 'Manage Course', path: '/admin/manage-course', icon: <CastForEducationIcon sx={{ fontSize: '14px' }} /> },
    { title: 'View Purchase', path: '/admin/view-purchase', icon: <InventoryIcon sx={{ fontSize: '14px' }} /> },
    { title: 'View User', path: '/admin/view-user', icon: <GroupAddIcon sx={{ fontSize: '14px' }} /> },
    { title: 'Feedback', path: '/admin/view-feedback', icon: <CommentIcon sx={{ fontSize: '14px' }} /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  console.log(activeItem,908)


  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} className='nav' sx={{ backgroundColor: '#ffffff' }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        color: 'black',
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ color: 'gray', fontWeight: '500', flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>
                <Button variant="text"  startIcon={<LogoutIcon />} onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box className="sidebar-body">
          <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>
              <SchoolIcon sx={{ fontSize: '29px', color: '#44ce42' }} />
              <Typography variant="h6" sx={{ ml: 1 }}>E-Learning</Typography>
            </Box>
            <IconButton onClick={handleDrawerClose} sx={{ color: '#44ce42' }}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <List>
            {sideBarList.map((item) => (
              <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                <Link to={item.path} style={{ textDecoration: 'none', color: 'white' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    //   backgroundColor: activeItem === item.title ? 'rgba(194, 244, 219, 0.12)' : 'inherit',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: '#44ce42',
                        backgroundColor: 'rgba(194, 244, 219, 0.12)',
                        padding: '4px',
                        fontSize: '80px',
                        borderRadius: '3px',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0, color: activeItem === item.title ? '#44ce42' : 'inherit' }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
