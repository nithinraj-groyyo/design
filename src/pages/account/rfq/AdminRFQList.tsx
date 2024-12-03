import React, { useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button, Box } from '@mui/material';
import { useGetRFQListQuery } from '../../../rtk-query/rfqSlice';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { useNavigate } from 'react-router-dom';

const AdminRFQList = () => {
    const token = JSON.parse(localStorage.getItem("authToken") as string);

    const { data, error, isLoading, isError } = useGetRFQListQuery(token);

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            console.error("Error fetching RFQ list:", error);
        }
    }, [isError, error]);

    if (isLoading) {
        return <CircularProgress />;
    }

    const handleCreateRfq = () => {
        navigate("/add-rfq");
    };

    const handleDownload = (signedURL: string) => {
        if (!signedURL) {
            alert('Download URL not available.');
            return;
        }
        window.open(signedURL, '_blank');
    };

    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='Admin RFQ List'>
                <Box display="flex" justifyContent="flex-end">
                    {/* <Button variant="contained" color="primary" onClick={handleCreateRfq}>
                        Add New RFQ
                    </Button> */}
                </Box>
            </AccountSettingsLayout.Header>
            <div style={{ marginTop: '20px' }}>
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <Table aria-label="RFQ List Table">
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell align="center"><strong>Brand Name</strong></TableCell>
                                <TableCell align="center"><strong>Email</strong></TableCell>
                                <TableCell align="center"><strong>MOQ</strong></TableCell>
                                <TableCell align="center"><strong>Target Cost</strong></TableCell>
                                <TableCell align="center"><strong>Country</strong></TableCell>
                                <TableCell align="center"><strong>Description</strong></TableCell>
                                <TableCell align="center"><strong>Status</strong></TableCell>
                                <TableCell align="center"><strong>Download</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((rfq: any) => (
                                    <TableRow key={rfq?.id} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                        <TableCell align="center">{rfq?.brandName ?? "-"}</TableCell>
                                        <TableCell align="center">{rfq?.email ?? "-"}</TableCell>
                                        <TableCell align="center">{rfq?.minOrderQty ?? "-"}</TableCell>
                                        <TableCell align="center">{rfq?.targetCost ?? "-"}</TableCell>
                                        <TableCell align="center">{rfq?.country ?? "-"}</TableCell>
                                        <TableCell align="center">{rfq?.description ?? "-"}</TableCell>
                                        <TableCell align="center">{rfq?.status ?? "-"}</TableCell>
                                        <TableCell align="center">
                                            {rfq?.signedUrl ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleDownload(rfq.signedUrl)}
                                                    sx={{ textTransform: 'none' }}
                                                >
                                                    Download
                                                </Button>
                                            ) : (
                                                <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>Not Available</Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography variant="h6" color="textSecondary">No RFQs found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {isError && (
                    <Typography color="error" align="center" sx={{ marginTop: '20px' }}>Failed to fetch RFQ list</Typography>
                )}
            </div>
        </AccountSettingsLayout>
    );
};

export default AdminRFQList;
