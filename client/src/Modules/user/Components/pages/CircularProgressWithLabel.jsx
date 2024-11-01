import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const CircularProgressWithLabel = (props) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} color='success'/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="textSecondary"
            >
                <Typography variant="caption" component="div" color="textSecondary" sx={{fontWeight:'600'}}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;
