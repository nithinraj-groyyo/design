import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Typography,
    Grid,
    Button,
    IconButton,
    Box,
    Chip,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IProduct } from '../../types/products';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { toast } from 'react-toastify';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAddToCartMutation } from '../../rtk-query/cartApiSlice';
import ColorOption from '../shoppingBag/ColorOptions';

const ProductDrawer = ({ isOpen, onClose, product }: { isOpen: boolean; onClose: () => void, product: IProduct }) => {


    const [quantity, setQuantity] = useState(0);
    const [variations, setVariations] = useState<any[]>([]);
    const [selectedColor, setSelectedColor] = useState<{ id: number, name: string, productColorId: number } | undefined>();
    const [selectedSize, setSelectedSize] = useState<{ id: number, name: string, productSizeId: number } | undefined>();
    const [overallQuantity, setOverallQuantity] = useState(0);
    const [pricePerPiece, setPricePerPiece] = useState(0);
    const [openVariationTable, setOpenVariationTable] = useState(false);
    const [isAddedToBag, setIsAddedToBag] = useState(false);

    const [addToCart] = useAddToCartMutation();

    useEffect(() => {
        const totalQty = variations.reduce((sum, variation) => sum + variation.quantity, 0);
        setOverallQuantity(totalQty);
        setPricePerPiece(getPriceForTotalQuantity(totalQty));
    }, [variations]);

    const incrementQuantity = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Select Color and Size")
            return
        };
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        const totalQty = overallQuantity + newQuantity;
        setPricePerPiece(getPriceForTotalQuantity(totalQty));
    };

    const decrementQuantity = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Select Color and Size")
            return
        };
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            const totalQty = overallQuantity + newQuantity;
            setPricePerPiece(getPriceForTotalQuantity(totalQty));
        }
    };

    const getPriceForTotalQuantity = (totalQty: number) => {
        const tier = product.productPrices.find(
            (price) => totalQty >= price.minQty && (!price.maxQty || totalQty <= price.maxQty)
        );
        return tier ? tier.pricePerPiece : 0;
    };

    const getColorCount = (colorId: number) => {
        return variations.reduce((count, variation) => {
            if (variation.color.id === colorId) {
                return count + variation.quantity;
            }
            return count;
        }, 0);
    };

    const addVariation = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Select Color and Size")
            return
        };

        const newVariation = {
            color: selectedColor,
            size: selectedSize,
            quantity,
        };

        setVariations((prev) => {
            const existingIndex = prev.findIndex(
                (v) => v.color.id === selectedColor.id && v.size.id === selectedSize.id
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            }

            return [...prev, newVariation];
        });

        setQuantity(1);
    };

    const calculateTotals = () => {
        let totalAmount = 0;
        let totalItems = 0;
        variations.forEach((variation) => {
            totalAmount += variation.quantity * pricePerPiece;
            totalItems += variation.quantity;
        });
        return { totalAmount, totalItems };
    };

    const { totalAmount, totalItems } = calculateTotals();

    const handleQuantityChange = (index: number, newQuantity: number) => {
        const updatedVariations = [...variations];
        updatedVariations[index].quantity = newQuantity;
        setVariations(updatedVariations);
    };

    const totalQuantity = variations.reduce((total, variation) => total + variation.quantity, 0);
    const unitPrice = product.productPrices?.find(price => totalQuantity >= price.minQty && (totalQuantity <= price.maxQty || !price.maxQty))?.pricePerPiece || 0;

    const handleAddToBag = async () => {
        if(Object.entries(variations)?.length === 0){
            toast.warn("Add Variations");
        }
        const payload = {
            productId: product?.id,
            cartItems: variations?.map((variation) => {
                return {
                    productColorId: variation?.color?.productColorId,
                    productSizeId: variation?.size?.productSizeId,
                    quantity: variation?.quantity
                }
            })
        }

        try {
            const response = await addToCart({payload});
            const responseBody = response?.data;
            if(responseBody?.status){
                toast.success(responseBody?.message)
                setIsAddedToBag(true);
            }
        } catch (error: any) {
            console.error(error)
        }
    };

    const handleGoToBag = () => {
        setSelectedColor(undefined);
        setSelectedSize(undefined);
        setQuantity(0);
        setOverallQuantity(0);
        setPricePerPiece(0);
    }

    return (
        <Drawer hideBackdrop anchor="right" open={isOpen} onClose={onClose} PaperProps={{ sx: { width: '50%' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box p={4} sx={{ flexGrow: 1, overflowY: 'auto' }} >

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <p className='text-sm 2xl:text-[1rem] font-bold'>Select variations and quantity</p>
                        <IconButton onClick={openVariationTable ? () => setOpenVariationTable(false) : onClose}>
                            {openVariationTable ? <KeyboardArrowDownIcon /> : <CloseIcon />}


                        </IconButton>
                    </Box>

                    {openVariationTable ? (
                        <>
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
                                        {variations.map((variation, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    <Box display="flex" alignItems="center" justifyContent="start" gap={1}>
                                                        <p
                                                            style={{
                                                                backgroundColor: variation.color.name?.toLowerCase(),
                                                                borderRadius: '50%',
                                                            }}
                                                            className='w-5 h-5'
                                                        />
                                                        <p className='text-sm 2xl:text-[1rem]'>
                                                            {variation.color.name}, {variation.size.name}
                                                        </p>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p className='text-sm 2xl:text-[1rem]'>
                                                        <CurrencyRupeeIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle' }} />
                                                        {unitPrice.toFixed(2)}
                                                    </p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                        <IconButton
                                                            onClick={() => handleQuantityChange(index, variation.quantity - 1)}
                                                            disabled={variation.quantity <= 1}
                                                            size="small"
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <p className='text-sm 2xl:text-[1rem]'>{variation.quantity}</p>
                                                        <IconButton
                                                            onClick={() => handleQuantityChange(index, variation.quantity + 1)}
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

                            {variations.length === 0 && <p className='text-center p-2'>No variations added.</p>}
                        </>
                    ) : (
                        <>


                            <p className='text-sm 2xl:text-[1rem] my-2 font-bold'>
                                Price before shipping :
                            </p>
                            <Grid container spacing={2}>
                                {product?.productPrices?.map((price) => {
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

                            <Divider sx={{ my: 2 }} />

                            <p className='text-sm 2xl:text-[1rem] text-gray-500 my-2'>
                                1. Color ({product?.productColors?.length}): {selectedColor?.name}
                            </p>
                            <Grid container spacing={2}>
                                {product?.productColors?.map(
                                    (color: any, index) => (
                                        <Grid item key={index} onClick={() => setSelectedColor({ id: color?.id, name: color?.name, productColorId: color?.productColorId })}>
                                            <ColorOption
                                                selectedColor={selectedColor?.id! === color?.id}
                                                color={color?.name}
                                                count={getColorCount(color.id)}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <p className='text-sm 2xl:text-[1rem] my-2 text-gray-500'>
                                2. Size({product?.sizes?.length}): {selectedSize?.name}
                            </p>
                            <Grid container spacing={2}>
                                {product?.sizes.map((size, index) => (
                                    <Grid item key={index} onClick={() => setSelectedSize({ id: size?.id, name: size?.name, productSizeId: size?.productSizeId })}>
                                        <div className={`bg-[#F4F4F4] text-center cursor-pointer rounded-lg p-2 min-w-10 ${selectedSize?.id === size?.id ? "border-2 border-black" : ""}`}>
                                            {size?.name}
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                <Grid item xs={3}>
                                    <p className='text-sm 2xl:text-[1rem]'>{product?.name}</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p className='whitespace-nowrap'><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />{pricePerPiece.toFixed(2)} / pc</p>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className='flex items-center justify-around rounded-2xl  border border-1 p-1'>
                                        <div className='cursor-pointer px-2' onClick={decrementQuantity}>-</div>
                                        <p>{quantity}</p>
                                        <div className='cursor-pointer px-2' onClick={incrementQuantity}>+</div>
                                    </div>
                                </Grid>
                            </Grid>

                            <Button variant="outlined" color="primary" onClick={addVariation} fullWidth sx={{ mt: 2 }}>
                                Add Variation
                            </Button>

                            <Divider sx={{ my: 2 }} />
                        </>
                    )}
                </Box>
            </Box>
            <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: 'white', p: 2 }}>
                <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body2" className='underline cursor-pointer' onClick={() => setOpenVariationTable(!openVariationTable)}>Items Subtotal ({variations?.length} variations and {totalItems} items)</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body2">Total Amount</Typography>
                        <Typography variant="body2"><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />{totalAmount.toFixed(2)} (<CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />{unitPrice.toFixed(2)} /pc)</Typography>
                    </Grid>
                </Box>

                <Grid container spacing={1} sx={{ mt: 4 }}>
                    {isAddedToBag ? (
                        <Grid item xs={12}>
                            <Button  variant="outlined" fullWidth className='!bg-black !text-white' onClick={handleGoToBag}>
                                Go To Bag
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Button disabled={Object.entries(variations)?.length === 0} variant="contained" className='!bg-black !text-white' fullWidth onClick={handleAddToBag}>
                                Add To Bag
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Drawer>
    );
};

export default ProductDrawer;