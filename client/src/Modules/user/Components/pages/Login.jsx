import React, { useState } from 'react';
import '../../css/Login.css';
import SchoolIcon from '@mui/icons-material/School';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = ({ count, setCount }) => {
  const host = "http://127.0.0.1:5000";
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = data.email ? "" : "Email is required.";
    tempErrors.password = data.password ? "" : "Password is required.";

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = emailRegex.test(data.email) ? "" : "Email is not valid.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      Axios.post(`${host}/api/user/user-login`, data)
        .then((response) => {
          console.log("Insert Response : " + response.data.cname);
          if (response.data.success === true) {
            localStorage.setItem("userToken", JSON.stringify(response.data.token));
            setOpen(true);
            setCount(!count);
            
            setTimeout(async()=>{
                await nav("/");
                 
            },1000)
          } else {
            setOpen2(true);
          }
        })
        .catch((err) => {
          console.log("Error : " + err);
        });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2>Welcome, Login</h2>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px' }} />
          <h1>E-Learning</h1>
        </Box>
        <div className="offer">
          <div className="offer-details">
            <p>We are committed to delivering exceptional educational content that inspires, educates, and empowers learners of all backgrounds.</p>
            <h3>Thank You For Choosing Us.</h3>
          </div>
        </div>
      </div>
      <div className="contact-form2">
        <div>
          <input type="email" onChange={handleChange} name='email' placeholder="Your E-mail..." className="input-field" />
          {errors.email && <div className="error">{errors.email}</div>}
          <input type="password" onChange={handleChange} name='password' placeholder="Password..." className="input-field" />
          {errors.password && <div className="error">{errors.password}</div>}
          <button onClick={handleSubmit} className="submit-button">Login</button>
        </div>
        <div style={{ padding: '10px' }}>
          <Link to={'/register'} style={{ textDecoration: 'none' }}><span style={{ color: 'white' }}>New user ? Register </span></Link>
        </div>
      </div>
      <div>
        <Snackbar
          open={open2}
          autoHideDuration={4000}
          onClose={handleClose2}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose2}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Incorrect Email or Password!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Login Successful.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
