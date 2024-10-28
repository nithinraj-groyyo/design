import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface OrderDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  order: any; // Adjust type as per your actual data structure
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, handleClose, order }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details - #{order?.id}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Cart Summary</Typography>
          <Typography variant="body2" color="textSecondary">
            Total Items: {order?.cart?.cartItems?.length}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Total Price: <CurrencyRupeeIcon fontSize="small" /> {order?.cart?.price}
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.cart?.cartItems?.map((item: any) => (
                <TableRow key={item.product.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <CurrencyRupeeIcon fontSize="small" />
                    {item.product.unitPrice}
                  </TableCell>
                  <TableCell>
                    <CurrencyRupeeIcon fontSize="small" />
                    {item.quantity * item.product.unitPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsModal;