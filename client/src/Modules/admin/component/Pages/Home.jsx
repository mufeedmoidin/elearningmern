import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush
} from 'recharts';

const StyledBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    boxShadow: theme.shadows[3],
    position: 'relative',
}));

const IconAvatar = styled(Avatar)(({ theme, color }) => ({
    backgroundColor: color || theme.palette.primary.main,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
}));

const ColoredBar = styled(Box)(({ theme, color }) => ({
    width: 5,
    backgroundColor: color || theme.palette.primary.main,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
}));

export default function Home() {
    const host = "http://127.0.0.1:5000";

    const [course, setCourse] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [user, setUser] = useState([]);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        axios.get(`${host}/api/admin/getcourse`)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`${host}/api/user/get-user`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`${host}/api/user/get-all-bookings`)
            .then((res) => {
                setPurchase(res.data);
                console.log(purchase, 'pur')
            })
            .catch((err) => {
                console.log(err);
            });

        // Fetch sales data for the graph
        axios.get(`${host}/api/user/sales`)
            .then((res) => {
                const formattedData = res.data.map(item => ({
                    date: item._id,
                    sales: item.sales
                }));
                setSalesData(formattedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(salesData, 990)



    return (
        <StyledBox>
            <Typography variant="h5" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <IconAvatar color="#3f51b5">
                            <SchoolIcon />
                        </IconAvatar>
                        <CardContent>
                            <Typography variant="h6">Total Courses</Typography>
                            <Typography variant="h5">{course?.length}</Typography>
                        </CardContent>
                        <ColoredBar color="#3f51b5" />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <IconAvatar color="#f50057">
                            <PeopleIcon />
                        </IconAvatar>
                        <CardContent>
                            <Typography variant="h6">Total Users</Typography>
                            <Typography variant="h5">{user?.length}</Typography>
                        </CardContent>
                        <ColoredBar color="#f50057" />
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StyledCard>
                        <IconAvatar color="#4caf50">
                            <ShoppingCartIcon />
                        </IconAvatar>
                        <CardContent>
                            <Typography variant="h6">Total Purchases</Typography>
                            <Typography variant="h5">{purchase?.length}</Typography>
                        </CardContent>
                        <ColoredBar color="#4caf50" />
                    </StyledCard>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2 }}>
                                Sales Over Time
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    data={salesData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#3f51b5' }} />
                                    <YAxis tick={{ fontSize: 12, fill: '#3f51b5' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: 10, borderColor: '#3f51b5' }} />
                                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12, color: '#3f51b5' }} />
                                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                    <Brush dataKey="date" height={30} stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </StyledBox>
    );
}
