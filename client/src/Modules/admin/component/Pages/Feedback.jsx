import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PreviewIcon from '@mui/icons-material/Preview';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2'
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';



const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '10px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    maxHeight: '500px',
    overflowY: 'auto',
    //   border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function Feedback() {
    const host = "http://127.0.0.1:5000";


    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        axios.get(`${host}/api/user/get-detailed-feedback`)
            .then((res) => {
                console.log(res.data)
                setFeedback(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])




    return (
        <div style={{ height: '100vh' }}>


            <Paper sx={{ padding: '20px 20px 20px 20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ mb: 2, color: 'gray', fontWeight: '500' }}>User Feedback on Course</Typography>

                </Box>
                <TableContainer >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">User Info</StyledTableCell>
                                <StyledTableCell align="center">Course Info</StyledTableCell>
                                <StyledTableCell >Feedback</StyledTableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedback.map((row, index) => (
                                <StyledTableRow key={row.user_id._id}>

                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}><PersonIcon />  {row.name}</Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px' }}><EmailIcon /> {row.email}</Box>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {/* <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',}}> */}

                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',width:'100%'}}>
                                                <img src={`http://localhost:5000/api/image/${row?.course_id?.thumbnail}`} alt="" style={{ width: '200px', height: '150px', borderRadius: '30px', objectFit: 'contain' }} />
                                                <Typography variant='body1' sx={{ width: '35%', fontWeight: '600' }}>{row?.course_id?.title}</Typography>

                                            </Box>
                                        {/* </Box> */}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <TextField  variant='standard' multiline value={row?.message} disabled rows={4} sx={{ width: '450px' }} />

                                            
                                    </StyledTableCell>
                                   


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Paper>
        </div>
    );
}
