import React,{useEffect} from 'react'
import { Routes, Route,useLocation,useNavigate } from 'react-router-dom'
import Navigation from '../component/Nav/Navigation'
import Box from '@mui/material/Box';
import Home from '../component/Pages/Home';
import { styled, useTheme } from '@mui/material/styles';
import '../css/Style.css';
import CssBaseline from '@mui/material/CssBaseline';
import ManageCourse from '../component/Pages/ManageCourse';
import AddCourse from '../component/Pages/AddCourse';
import ViewChapters from '../component/Pages/ViewChapters';
import UpdateCourse from '../component/Pages/UpdateCourse';
import ViewUser from '../component/Pages/ViewUser';
import ViewPurchase from '../component/Pages/ViewPurchase';
import Feedback from '../component/Pages/Feedback';
import AdminLogin from '../component/Pages/AdminLogin';




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function AdminRoute() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const navigate = useNavigate();

  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('adminToken')) == null) {
        navigate('/admin/login')

    }

}, [])

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Conditionally render Navigation if not in login page */}
        {!isLoginPage && <Navigation />}
        
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f0f1f6' }}>
          {/* Conditionally render DrawerHeader if not in login page */}
          {!isLoginPage && <DrawerHeader />}
          
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/manage-course" element={<ManageCourse />} />
            <Route exact path="/add-course" element={<AddCourse />} />
            <Route exact path="/view-user" element={<ViewUser />} />
            <Route exact path="/view-purchase" element={<ViewPurchase />} />
            <Route exact path="/view-feedback" element={<Feedback />} />
            <Route exact path="/view-chapter/:id" element={<ViewChapters />} />
            <Route exact path="/update-course/:id" element={<UpdateCourse />} />
            <Route exact path="/login" element={<AdminLogin />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}
