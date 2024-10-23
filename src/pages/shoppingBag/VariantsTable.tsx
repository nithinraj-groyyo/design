import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { BagItem, updateQuantity } from '../../redux/bagSlice';
import { RootState } from '../../redux/store';

const VariantsTable = () => {
    const dispatch = useDispatch();

    const { selectedCart } = useSelector((state: RootState) => state.bag)

    const handleQuantityChange = (variantId: number, newQuantity: number, cartItemId: number) => {
        dispatch(updateQuantity({ cartItemId, variantId, quantity: newQuantity }));
    };

    return (
        <>
            <p className='text-sm 2xl:text-[1rem] my-2 font-bold'>
                Price before shipping :
            </p>
            <Grid container spacing={2}>
                {selectedCart?.product?.productPrices?.map((price) => {
                    return (
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
                    );
                })}
            </Grid>
            <TableContainer
                component={Paper}
                sx={{ mt: 2, maxHeight: "70vh", overflowY: 'auto' }}
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
                        {selectedCart?.cartItemVariants?.map((variant: any, index: number) => {
                            console.log(variant, "variant")
                            return (
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
                                            {selectedCart.price.toFixed(2)}
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
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default VariantsTable;