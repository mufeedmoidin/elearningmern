import React, { useState } from 'react';
import '../../css/Login.css';
import SchoolIcon from '@mui/icons-material/School';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const host = "http://127.0.0.1:5000";
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = data.name ? "" : "Name is required.";
    tempErrors.phone = data.phone ? "" : "Phone number is required.";
    tempErrors.email = data.email ? "" : "Email is required.";
    tempErrors.password = data.password ? "" : "Password is required.";

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = emailRegex.test(data.email) ? "" : "Email is not valid.";
    }

    if (data.phone) {
      const phoneRegex = /^[0-9]{10}$/;
      tempErrors.phone = phoneRegex.test(data.phone) ? "" : "Phone number must be 10 digits.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      axios.post(`${host}/api/user/user-register`, data)
        .then((response) => {
          console.log("Insert Response : " + response.data.cname);
          if (response.data) {
            nav("/login/");
          } else {
            console.log("Some error occurred");
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
        <h2>Registration</h2>
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
      <div className="contact-form">
        <div>
          <input type="text" onChange={handleChange} name='name' placeholder="Your Name..." className="input-field" />
          {errors.name && <div className="error">{errors.name}</div>}
          
          <input type="tel" onChange={handleChange} name='phone' placeholder="Your Phone Number..." className="input-field" />
          {errors.phone && <div className="error">{errors.phone}</div>}
          
          <input type="email" onChange={handleChange} name='email' placeholder="Your E-mail..." className="input-field" />
          {errors.email && <div className="error">{errors.email}</div>}
          
          <input type="password" onChange={handleChange} name='password' placeholder="Password..." className="input-field" />
          {errors.password && <div className="error">{errors.password}</div>}
          
          <button onClick={handleSubmit} className="submit-button">Register</button>
        </div>
        <div style={{ padding: '10px' }}>
          <Link to={'/login'} style={{ textDecoration: 'none' }}><span style={{ color: 'white' }}>Already a user? Login</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
