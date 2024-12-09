import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    Box,
    Select,
    MenuItem,
} from '@mui/material';
import { useGetRFQListQuery, useUpdateRFQStatusMutation } from '../../../rtk-query/rfqSlice';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export enum RFQEnums {
    REQUESTED = 'REQUESTED',
    IN_PROGRESS = 'IN_PROGRESS',
    ORDER_PLACED = 'ORDER_PLACED',
    DECLINED_BY_USER = 'DECLINED_BY_USER',
    DELINED_BY_ADMIN = 'DELINED_BY_ADMIN',
}

const AdminRFQList = () => {
    const token = JSON.parse(localStorage.getItem('authToken') as string);

    const { data, error, isLoading, isError } = useGetRFQListQuery(token);
    const [updateRFQStatus, { isLoading: isUpdating }] = useUpdateRFQStatusMutation();

    const navigate = useNavigate();
    const [rfqStatuses, setRfqStatuses] = useState<any>({});

    useEffect(() => {
        if (data && data.length > 0) {
            const initialStatuses = data.reduce((acc: any, rfq: any) => {
                acc[rfq.id] = rfq.status ?? '';
                return acc;
            }, {});
            setRfqStatuses(initialStatuses);
        }

        if (isError) {
            console.error('Error fetching RFQ list:', error);
        }
    }, [data, isError, error]);

    console.log(data,"feefeefef")

    if (isLoading) {
        return <CircularProgress />;
    }

    const handleStatusChange = async (rfqId: string, newStatus: string) => {
        setRfqStatuses((prevStatuses: any) => ({
            ...prevStatuses,
            [rfqId]: newStatus,
        }));

        try {
            await updateRFQStatus({ id: rfqId, status: newStatus, token }).unwrap();
            console.log(`Successfully updated status for RFQ ${rfqId} to ${newStatus}`);
        } catch (updateError) {
            console.error(`Error updating status for RFQ ${rfqId}:`, updateError);
            toast.error('Failed to update status. Please try again.');
        }
    };

    const handleCreateRfq = () => {
        navigate('/add-rfq');
    };

    const handleDownload = (signedURL: string) => {
        if (!signedURL) {
            toast.error('Download URL not available.');
            return;
        }
        window.open(signedURL, '_blank');
    };

    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title="Admin RFQ List">
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
                                        <TableCell align="center">{rfq?.brandName ?? '-'}</TableCell>
                                        <TableCell align="center">{rfq?.email ?? '-'}</TableCell>
                                        <TableCell align="center">{rfq?.minOrderQty ?? '-'}</TableCell>
                                        <TableCell align="center">{rfq?.targetCost ?? '-'}</TableCell>
                                        <TableCell align="center">{rfq?.country ?? '-'}</TableCell>
                                        <TableCell align="center">{rfq?.description ?? '-'}</TableCell>
                                        <TableCell align="center">
                                            <Select
                                                value={rfqStatuses[rfq.id] ?? ''}
                                                onChange={(e) => handleStatusChange(rfq.id, e.target.value)}
                                                displayEmpty
                                                sx={{
                                                    minWidth: 100,
                                                    fontSize: '0.875rem',
                                                    padding: '4px 8px',
                                                }}
                                                size="small"
                                            >
                                                {Object.entries(RFQEnums).map(([key, value]) => (
                                                    <MenuItem key={key} value={value} className='!text-sm !min-w-full'>
                                                        {value.replace(/_/g, ' ')}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>

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

                {/* {isError && (
                    <Typography color="error" align="center" sx={{ marginTop: '20px' }}>Failed to fetch RFQ list</Typography>
                )} */}
            </div>
        </AccountSettingsLayout>
    );
};

export default AdminRFQList;
