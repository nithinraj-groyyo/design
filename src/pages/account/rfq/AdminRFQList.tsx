import React, { useEffect } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material';
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
        navigate("/add-rfq")
    }

    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='Admin RFQ List'>
                <Button variant="contained" color="primary" onClick={handleCreateRfq}>
                    Add New RFQ
                </Button>
            </AccountSettingsLayout.Header>
            <div>

                {/* Table Container */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Brand Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>MOQ</TableCell>
                                <TableCell>Target Cost</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((rfq: any) => (
                                    <TableRow key={rfq?.id}>
                                        <TableCell>{rfq?.brandName}</TableCell>
                                        <TableCell>{rfq?.email}</TableCell>
                                        <TableCell>{rfq?.minOrderQty}</TableCell>
                                        <TableCell>{rfq?.targetCost}</TableCell>
                                        <TableCell>{rfq?.country}</TableCell>
                                        <TableCell>{rfq?.description}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No RFQs found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Handle error state */}
                {isError && (
                    <Typography color="error" align="center">Failed to fetch RFQ list</Typography>
                )}
            </div>
        </AccountSettingsLayout>
    );
};

export default AdminRFQList;
