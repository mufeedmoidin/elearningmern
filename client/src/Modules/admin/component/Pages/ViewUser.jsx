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


export default function ViewUser() {
    const host = "http://127.0.0.1:5000";


    const [user, setUser] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('');
    const [roadmap, setRoadmap] = useState([]);
    const [deleteCat, setDeleteCourse] = useState(false);

    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get(`${host}/api/user/get-user`)
            .then((res) => {
                console.log(res.data)
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


  

    return (
        <div style={{ height: '100vh' }}>


            <Paper sx={{ padding: '20px 20px 20px 20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ mb: 2, color: 'gray', fontWeight: '500' }}>View User Details</Typography>

                </Box>
                <TableContainer >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sl.no</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Phone Number</StyledTableCell>
                                <StyledTableCell align="center">Email Address</StyledTableCell>
                                <StyledTableCell align="center">Date</StyledTableCell>
                                {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.map((row, index) => (
                                <StyledTableRow key={row.name}>

                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {moment(row?.createdAt).format("MMM Do YYYY")}

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
