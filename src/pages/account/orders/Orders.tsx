import React, { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useFetchOrderListQuery } from '../../../rtk-query/orderApiSlice';


const Orders = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = JSON.parse(localStorage.getItem("authToken") as string);

  const { data: ordersList } = useFetchOrderListQuery({ token });

  console.log(ordersList, "ordersList")

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1);
  };

  const displayedOrders = ordersList?.data?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Card sx={{ width: '95%', margin: '1rem', padding: '1rem' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        My Orders
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: '1rem' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Rows per page</InputLabel>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            label="Rows per page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Total Items</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders?.map((order: any) => {
              const isoString = order.createdAt;
              const date = new Date(isoString);
              
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              return (
                <TableRow key={order.id}>
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{formattedDate}</TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '16px',
                        color:
                          order.status === 'Shipped'
                            ? '#1e3a8a'
                            : order.status === 'Delivered'
                              ? '#065f46'
                              : order.status === 'Processing'
                                ? '#92400e'
                                : '#7f1d1d',
                        backgroundColor:
                          order.status === 'Shipped'
                            ? '#e0f2fe'
                            : order.status === 'Delivered'
                              ? '#d1fae5'
                              : order.status === 'Processing'
                                ? '#ffedd5'
                                : '#fee2e2',
                      }}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">{order?.cart?.cartItems?.length}</TableCell>
                  <TableCell align="center">
                    <p className="uppercase font-light text-sm">
                      <span><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} /></span>
                      <span> {order?.cart?.price}</span>
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                      View
                    </Button>
                    {/* <Button variant="outlined" color="secondary">
                      Download Invoice
                    </Button> */}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} alignItems="center" sx={{ marginTop: '1rem' }}>
        <Pagination
          count={Math.ceil(ordersList?.data?.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Card>
  );
};

export default Orders;