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
  Divider,
} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface OrderDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  order: any;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, handleClose, order }) => {
  console.log(order, "order")
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details - #{order?.id}</DialogTitle>
      <DialogContent>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Order Information</Typography>
          <Typography variant="body2">Order Status: <strong>{order?.status}</strong></Typography>
          <Typography variant="body2">Order Date: {new Date(order?.createdAt).toLocaleDateString()}</Typography>
          <Typography variant="body2">Customer: {order?.user?.contactName}</Typography>
          <Typography variant="body2">Contact Number: {order?.user?.contactNumber}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Shipping Address</Typography>
          <Typography variant="body2">
            {order?.address?.name}, {order?.address?.phoneNumber}
          </Typography>
          <Typography variant="body2">
            {order?.address?.street}, {order?.address?.landMark}, {order?.address?.city}, {order?.address?.state}, {order?.address?.postalCode}, {order?.address?.country}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Cart Summary</Typography>
          <Typography variant="body2">Total Items: {order?.cart?.cartItems?.length}</Typography>
          <Typography variant="body2">
            Total Price: <CurrencyRupeeIcon fontSize="small" /> {order?.cart?.price}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell style={{whiteSpace:"nowrap"}}>Quantity</TableCell>
                <TableCell  style={{whiteSpace:"nowrap"}}>Unit Price</TableCell>
                <TableCell style={{whiteSpace:"nowrap"}}>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.cart?.cartItems?.map((item: any) => {
                function getPriceForQuantity(quantity: number) {
                  const range = item?.product?.productPrices?.find(
                    (range: any) => quantity >= range.minQty && quantity <= range.maxQty
                  );

                  return range ? range.pricePerPiece : null;
                }
                const unitPrice = getPriceForQuantity(item?.quantity)
                return (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{item.product.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{item.product.description}</Typography>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <div className='whitespace-nowrap'>
                        <CurrencyRupeeIcon fontSize="small" />
                        {unitPrice || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell >
                      <div className='whitespace-nowrap'>
                        <CurrencyRupeeIcon fontSize="small" />
                        {item.quantity * (unitPrice || 0)}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
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