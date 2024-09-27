import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';

const NoDataAvailable = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <SentimentDissatisfied sx={{ fontSize: 80, color: '#FF6F61' }} />
      <Typography variant="h4" sx={{ marginY: 2, fontWeight: 'bold', color: '#333' }}>
        No Data Available
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, color: '#555' }}>
        We couldn't find any data to display. Please try again later or check your settings.
      </Typography>
    </Box>
  );
};

export default NoDataAvailable;
