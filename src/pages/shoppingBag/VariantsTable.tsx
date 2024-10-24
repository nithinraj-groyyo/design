import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCart, updateQuantity } from '../../redux/bagSlice';
import { RootState } from '../../redux/store';
import { useUpdateCartQuantityMutation } from '../../rtk-query/cartApiSlice';
import { toast } from 'react-toastify';

interface IVariantsTableProps {
    setIsDrawerOpen: (val: boolean) => void;
}

const VariantsTable = ({setIsDrawerOpen}: IVariantsTableProps) => {
    const dispatch = useDispatch();

    const token = JSON.parse(localStorage.getItem('authToken') as string);

    const { selectedCart, cart } = useSelector((state: RootState) => state.bag);

    const [updateCartQuantity] = useUpdateCartQuantityMutation();

    const handleQuantityChange = (variantId: number, newQuantity: number, cartItemId: number) => {
        dispatch(updateQuantity({ cartItemId, variantId, quantity: newQuantity }));
    };

    const handleUpdateQuantity = async() => {
        try {
            if(selectedCart){
                const requestBody = selectedCart?.cartItemVariants?.map((variant) => {
                    return {
                        cartItemVariantId: variant?.id,
                        quantity: variant?.quantity,
                    }
                })

                const response = await updateCartQuantity({cartId: cart?.cartId, payload: requestBody, token}).unwrap();

                if(response?.status){
                    toast.success(response?.message);
                    setIsDrawerOpen(false);
                    dispatch(setSelectedCart(null));
                    // window.location.reload();
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', paddingBottom: '80px' }}>
            <p className='text-sm 2xl:text-[1rem] my-2 px-4 font-bold'>
                Price before shipping:
            </p>
            <Grid container spacing={2} sx={{px:2}}>
                {selectedCart?.product?.productPrices?.map((price) => (
                    <Grid item xs={3} key={price.id}>
                        <div className='text-xs 2xl:text-[1rem] text-gray-500'>
                            {Boolean(price?.maxQty) ? (
                                <>
                                    {price?.minQty} - {price?.maxQty} pcs
                                </>
                            ) : (
                                <>
                                    &gt;= {price?.minQty - 1} pcs
                                </>
                            )}
                        </div>
                        <div className="uppercase font-semibold text-sm 2xl:text-2xl">
                            <span><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} /></span>
                            <span>{price?.pricePerPiece}</span>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <TableContainer
                component={Paper}
                sx={{ mt: 2, p:2, maxHeight: '70vh', overflowY: 'auto' }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><p className='text-sm 2xl:text-[1rem]'>Variations</p></TableCell>
                            <TableCell align="center"><p className='text-sm 2xl:text-[1rem]'>Unit Price</p></TableCell>
                            <TableCell align="center"><p className='text-sm 2xl:text-[1rem]'>Quantity</p></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedCart?.cartItemVariants?.map((variant: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    <Box display="flex" alignItems="center" justifyContent="start" gap={1}>
                                        <p
                                            style={{
                                                backgroundColor: variant.productColor.color.name?.toLowerCase(),
                                                borderRadius: '50%',
                                            }}
                                            className='w-5 h-5'
                                        />
                                        <p className='text-sm 2xl:text-[1rem]'>
                                            {variant.productColor.color.name}, {variant.productSize.size.name}
                                        </p>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <p className='text-sm 2xl:text-[1rem]'>
                                        <CurrencyRupeeIcon sx={{ fontSize: "inherit" }} />
                                        {selectedCart?.price?.toFixed(2)}
                                    </p>
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <IconButton
                                            onClick={() =>
                                                handleQuantityChange(
                                                    variant.id,
                                                    variant.quantity - 1,
                                                    selectedCart.id
                                                )
                                            }
                                            disabled={variant.quantity <= 1}
                                            size="small"
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <p className='text-sm 2xl:text-[1rem]'>{variant.quantity}</p>
                                        <IconButton
                                            onClick={() =>
                                                handleQuantityChange(
                                                    variant.id,
                                                    variant.quantity + 1,
                                                    selectedCart.id
                                                )
                                            }
                                            size="small"
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>

            {/* Sticky footer */}
            <Box sx={{ position: 'sticky', bottom: 0, width: "100%", backgroundColor: 'white', p: 2, boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body2">Total Amount</Typography>
                        <Typography variant="body2">
                            <CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />
                            {(Number(selectedCart?.unitPrice) * Number(selectedCart?.totalQuantity))?.toFixed(2)} 
                            (<CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />
                            {selectedCart?.unitPrice?.toFixed(2)} /pc)
                        </Typography>
                    </Grid>
                </Box>

                <Grid container spacing={1} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth className='!bg-black !text-white' onClick={handleUpdateQuantity}>
                            Update Variants Quantity
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default VariantsTable;