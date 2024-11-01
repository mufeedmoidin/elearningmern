import { Box, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AdminLogin() {
    const host = "http://127.0.0.1:5000";

    const [data, setData] = useState({});
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose1 = (event, reason) => {
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
        setEmailError(false);
        setPasswordError(false);
        setData({ ...data, [e.target.name]: e.target.value });
    }

    console.log(data, 'login')

    const handleSubmit = () => {
        if (!data.email) {
            setEmailError('Please enter email address.');
        } else if (!data.password) {
            setPasswordError('Please enter password.');
        } else {
            Axios.post(`${host}/api/admin/adminLogin`, data)
                .then((response) => {
                    console.log("Insert Response : " + response.data.cname);
                    if (response.data.success === true) {
                        localStorage.setItem("adminToken", JSON.stringify(response.data.token));
                        setOpen2(true);
                        setTimeout(async()=>{
                            await navigate("/admin");
                             
                        },1000)
                    } else {
                        // console.log("Some error occurred");
                        setOpen(true)
                    }
                })
                .catch((err) => {
                    console.log("Error : " + err);
                });
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Box sx={{ width: '600px' }}>
                  
                    <Grid item component={Paper} elevation={6} square sx={{ padding: '20px', borderRadius: '10px', backgroundColor: '#ffffffd6' }}>
                        <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                        <SchoolIcon sx={{ fontSize: '43px', color: '#44ce42' }} />
                        <Typography variant="h4" sx={{ ml: 1 }}>E-Learning</Typography>
                    </Box>
                            <div style={{ display: "flex", alignItems: 'center',  color: '#1abc9c' }}>
                                <AdminPanelSettingsIcon sx={{ fontSize: '24px' }} />
                                <p className="nav-heading" style={{ fontSize: '1rem' }}>Admin Sign-In</p>
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                color='success'
                                size='small'
                                InputLabelProps={{ sx: { color: '#1abc9c', borderColor: '#1abc9c' } }}
                                inputProps={{
                                    sx: {
                                        color: '#1abc9c',
                                    }
                                }}
                                onChange={handleChange}
                            />

                            {emailError && <p style={{ color: 'red', fontWeight: '100', fontSize: '12px' }}> *{emailError}</p>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color='success'
                                size='small'
                                InputLabelProps={{ sx: { color: '#1abc9c', borderColor: '#1abc9c' } }}
                                inputProps={{
                                    sx: {
                                        color: '#1abc9c',
                                    }
                                }}
                                onChange={handleChange}
                            />
                            {passwordError && <p style={{ color: 'red', fontWeight: '100', fontSize: '12px' }}> *{passwordError}</p>}
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color='success'
                        sx={{ mt: 3, mb: 2, bgcolor: '#1abc9c' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={open2}
                autoHideDuration={4000} // Set auto hide duration to 4000 milliseconds (4 seconds)
                onClose={handleClose2} // Call handleClose2 when Snackbar should close
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position the Snackbar at the top right
            >
                <Alert
                    onClose={handleClose2}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Login Successful.
                </Alert>
            </Snackbar> 


            <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose1}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose1}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Incorrect Email or Password!
          </Alert>
        </Snackbar>
        </div>
    );
}
