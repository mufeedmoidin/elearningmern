import { Box, Typography } from '@mui/material'
import React from 'react'
import SchoolIcon from '@mui/icons-material/School';



export default function Footer() {
    return (
        <div>
            <Box sx={{ backgroundColor: '#7a6ad8', padding: '40px',borderTopLeftRadius:'130px',borderTopRightRadius:'130px' }}>
                <Box sx={{ display: 'flex',flexDirection:'column', alignItems: 'center',justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',color:'white' }}>
                        <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: '20px'
                            }}
                        >
                            E-Learning
                        </Typography>

                    </Box>
                    <p style={{color:'white',textAlign:'center'}}>Copyright @ E-Learning 2024 . All rights are reserved.</p>

                </Box>
            </Box>
        </div>
    )
}
