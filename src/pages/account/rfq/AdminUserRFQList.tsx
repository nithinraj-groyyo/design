import React, { useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useGetUserRFQListQuery } from '../../../rtk-query/rfqSlice';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { toast } from 'react-toastify';

const AdminUserRFQList = () => {
  const token = JSON.parse(localStorage.getItem('authToken') as string);
  const { data, isLoading, isError } = useGetUserRFQListQuery(token);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset to page 1 when rowsPerPage changes
  };

  const handleDownload = (signedURL: string) => {
    if (!signedURL) {
      toast.error('Download URL not available.');
      return;
    }
    window.open(signedURL, '_blank');
  };

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

  const displayedRFQs = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <AccountSettingsLayout>
      <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <Typography variant="h5" sx={{ marginBottom: '2rem', fontWeight: 600 }}>
          Your RFQ List
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '1rem' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={rowsPerPage}
              onChange={()=>handleRowsPerPageChange}
              label="Rows per page"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#4caf50' }}>
              <TableRow>
                <TableCell className="!text-center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Brand Name
                </TableCell>
                <TableCell className="!text-center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell className="!text-center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  MOQ
                </TableCell>
                <TableCell className="!text-center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Target Cost
                </TableCell>
                <TableCell className="!text-center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Status
                </TableCell>
                <TableCell className="!text-center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRFQs.map((rfq: any, index: number) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                  <TableCell className="!text-center">{rfq?.brandName}</TableCell>
                  <TableCell className="!text-center">{rfq?.email}</TableCell>
                  <TableCell className="!text-center">{rfq?.minOrderQty}</TableCell>
                  <TableCell className="!text-center">{rfq?.targetCost}</TableCell>
                  <TableCell className="!text-center">{rfq?.status}</TableCell>
                  <TableCell className="!text-center">
                    {rfq.signedUrl ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDownload(rfq.signedUrl)}
                      >
                        Download
                      </Button>
                    ) : (
                      <Typography color="textSecondary">Not Available</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} alignItems="center" sx={{ marginTop: '1rem' }}>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Box>
    </AccountSettingsLayout>
  );
};

export default AdminUserRFQList;
