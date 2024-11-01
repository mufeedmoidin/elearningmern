import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Typography } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SchoolIcon from '@mui/icons-material/School';

const Certificate = () => {
    const host = "http://127.0.0.1:5000";
    const { id } = useParams();
    const nav = useNavigate();
    const date = new Date().toLocaleDateString();
    const [courseStatus, setCourseStatus] = useState([]);

    const generatePDF = () => {
        const input = document.getElementById('certificate');
        html2canvas(input, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`course_certificate.pdf`);
        });
    };

    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));
        axios.get(`${host}/api/user/get-detailed-bookings`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                const chapters = res.data;
                const filtered = chapters.filter((i) => i.course_id._id === id)
                setCourseStatus(filtered)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button onClick={generatePDF} variant='outlined' sx={{ float: 'right' }} style={styles.button} startIcon={<PrintIcon />} size='small'>Download</Button>

            <div id="certificate" style={styles.certificate}>
                <div style={styles.border}>
                    <div style={styles.header}>

                        <SchoolIcon sx={{ fontSize: '4vw', color: 'grey' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: '3vw',
                                color: 'grey',
                                mb: 2

                            }}
                        >
                            E-Learning
                        </Typography>
                    </div>
                    <h1 style={styles.title}>Certificate of Completion</h1>
                    <p style={styles.subtitle}>This is to certify that</p>
                    <h2 style={styles.name}>{courseStatus[0]?.user_id?.name}</h2>
                    <p style={styles.subtitle}>has successfully completed the course based on</p>
                    <h2 style={styles.course}>{courseStatus[0]?.course_id?.title}</h2>
                    <p style={styles.date}>on {date}</p>
                    <div style={styles.signatureContainer}>
                        <p style={styles.signatureLine}>________________________</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    certificate: {
        width: '90%',
        maxWidth: '800px',
        height: 'auto',
        padding: '20px',
        textAlign: 'center',
        border: '10px solid #6c757d',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
    },
    border: {
        border: '5px solid #6c757d',
        padding: '20px',
        height: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#343a40',
        fontFamily: 'Georgia, serif',
        '@media (max-width: 600px)': {
            fontSize: '1.5rem',
        }
    },
    subtitle: {
        fontSize: '1.5rem',
        color: '#6c757d',
        fontFamily: 'Georgia, serif',
        '@media (max-width: 600px)': {
            fontSize: '1rem',
        }
    },
    name: {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#495057',
        fontFamily: 'Georgia, serif',
        textTransform: 'uppercase',
        '@media (max-width: 600px)': {
            fontSize: '1.2rem',
        }
    },
    course: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#495057',
        fontFamily: '"Garamond", "Georgia", serif',
        textTransform: 'uppercase',
        '@media (max-width: 600px)': {
            fontSize: '1rem',
        }
    },
    date: {
        fontSize: '1.5rem',
        marginTop: '30px',
        color: '#6c757d',
        fontFamily: 'Georgia, serif',
        '@media (max-width: 600px)': {
            fontSize: '1rem',
        }
    },
    signatureContainer: {
        marginTop: '50px',
    },
    signatureLine: {
        fontSize: '1.2rem',
        color: '#6c757d',
        fontFamily: 'Georgia, serif',
        '@media (max-width: 600px)': {
            fontSize: '0.8rem',
        }
    },
};

export default Certificate;
