import React from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton } from '@mui/material';
import { useGetUserRFQListQuery } from '../../rtk-query/rfqSlics';
import { Visibility } from '@mui/icons-material';

const UserRFQList = () => {
  const token = JSON.parse(localStorage.getItem("authToken") as string);
  const { data, isLoading, isError, error } = useGetUserRFQListQuery(token);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" sx={{ marginTop: '2rem' }}>
        Failed to load RFQ List. {'Please try again later.'}
      </Typography>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Typography align="center" sx={{ marginTop: '2rem' }}>
        No RFQs available.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ marginBottom: '2rem', fontWeight: 600 }}>
        Your RFQ List
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#4caf50' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Brand Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>MOQ</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Target Cost</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rfq: any, index: number) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                <TableCell>{rfq.brandName}</TableCell>
                <TableCell>{rfq.email}</TableCell>
                <TableCell>{rfq.MOQ}</TableCell>
                <TableCell>{rfq.targetCost}</TableCell>
                <TableCell>{rfq.status}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => alert('View details or perform an action')} 
                    sx={{ '&:hover': { backgroundColor: '#e0f7fa' } }}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserRFQList;
