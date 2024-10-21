import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Variation {
  color: { id: number; name: string };
  size: { id: number; name: string };
  occasion: string;
  quantity: number;
}

interface VariationsTableProps {
  variations: Variation[];
  pricePerPiece: number;
  onQuantityChange: (index: number, newQuantity: number) => void;
}

const VariationsTable: React.FC<VariationsTableProps> = ({ variations, pricePerPiece, onQuantityChange }) => {
  const handleIncrement = (index: number) => {
    onQuantityChange(index, variations[index].quantity + 1);
  };

  const handleDecrement = (index: number) => {
    if (variations[index].quantity > 1) {
      onQuantityChange(index, variations[index].quantity - 1);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Variations</Typography></TableCell>
            <TableCell><Typography variant="h6">Unit Price</Typography></TableCell>
            <TableCell><Typography variant="h6">Quantity</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variations.map((variation, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography>{variation.color.name}, {variation.size.name}, {variation.occasion}</Typography>
              </TableCell>
              <TableCell>
                <Typography>${pricePerPiece.toFixed(2)}</Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleDecrement(index)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{variation.quantity}</Typography>
                  <IconButton onClick={() => handleIncrement(index)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VariationsTable;