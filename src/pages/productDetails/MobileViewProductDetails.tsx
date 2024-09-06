import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, IconButton, Typography } from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateWishlistResponse } from '../../api/userApi';
import { updateProductWishlist, updateSingleProductWishlist } from '../../redux/productsSlice';
import useFetchProductById from '../../hooks/useFetchProductById';
import { useParams } from 'react-router-dom';
import { getImagesFromUrl } from '../../utilities/helper';
import AddToBagButton from './AddToBagButton';
import ProductCard from '../product_list/ProductCard';
import useFetchProducts from '../../hooks/useFetchProducts';
import Footer from '../../components/footer/Footer';
import { setLocalWishlistItems } from '../../redux/wishlistSlice';

const MobileViewProductDetails = () => {
    const { productId, categoryKey } = useParams<{ productId: string, categoryKey: string }>();

    const [expanded, setExpanded] = useState(false);
    const [drawerHeight, setDrawerHeight] = useState(25);

    const dispatch = useDispatch();

    const userId = JSON.parse(localStorage.getItem('userId') as string);

    const { product } = useSelector((state: RootState) => state.products.singleProductData);
    const { products } = useSelector((state: RootState) => state.products.productData);

    const [isInWishlist, setIsInWishlist] = useState(false);

    useFetchProductById({ productId: Number(productId) });

    useEffect(() => {
        if(product){
            setIsInWishlist(product?.WishLists?.length > 0 ? +product?.WishLists[0]?.productId === +product?.id : false)
        }
    },[isInWishlist, product])

    const toggleDrawerHeight = () => {
        setExpanded(!expanded);
        setDrawerHeight(expanded ? 25 : 95);
    };

    useFetchProducts({categoryKey});

    const handleWishlistToggle = async () => {
        if(!userId && product){
            dispatch(setLocalWishlistItems({product} as any))
            return 
        }
        try {
            const add = !isInWishlist;
            if(product){
                const response = await updateWishlistResponse({ add, productId: product?.id, userId });
                if (response) {
                    setIsInWishlist(add);
                    dispatch(updateSingleProductWishlist({isInWishlist: add,  productId: product?.id}))
                    dispatch(updateProductWishlist({isInWishlist:!isInWishlist, productId: product?.id}));
                }
            }
        } catch (error: any) {
            console.error('Error updating wishlist:', error.message);
        }
    };

    return (
        <div className='lg:hidden'>
            <div className='mt-[3rem]'>
                {product?.ProductImages?.map((img, index) => (
                    <div key={index}>
                        <img
                            src={getImagesFromUrl(img?.filePath)}
                            alt={`Product ${index}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            <Drawer
                anchor="bottom"
                open={true}
                variant="persistent"
                PaperProps={{
                    sx: {
                        height: `${drawerHeight}vh`,
                        transition: "height 0.3s ease-in-out",
                        overflowY: expanded ? "" : "hidden"
                    },
                }}

            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                        cursor: "pointer",
                        // overflowY: "hidden"
                    }}
                    onClick={toggleDrawerHeight}
                >
                    <IconButton>
                        {!expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
                <Box sx={{ padding: "1rem" }}>
                    <div className="flex items-start w-full">
                        <div className="flex flex-col gap-2 flex-1">
                            <h1 className="text-sm text-black font-bold max-w-xs">{product?.name}</h1>
                            <div className="text-xs">
                                <span>&#8377;</span>
                                <span>{product?.price}</span>
                            </div>
                            <p className="text-xs text-gray-500">MRP INC OF ALL TAXES</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="p-2" onClick={handleWishlistToggle}>
                                {isInWishlist ? (
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='my-2'>
                        <AddToBagButton />
                    </div>
                    {(product?.leftHeading1 && product?.leftHeading2) && (
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="left-heading-1"
                                >
                                    {product?.leftHeading1}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {product?.leftHeading1Content}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="left-heading-2"
                                >
                                    {product?.leftHeading2}
                                </AccordionSummary>
                                <AccordionDetails>
                                {product?.leftHeading2Content}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )}
                    <div className='flex flex-col gap-4 my-[2rem] lg:my-[10rem]'>
                        <Typography className='text-[#2D2D2A] text-xs lg:text-sm tracking-widest px-0 lg:px-4'>YOU MAY ALSO LIKE</Typography>
                        <div className='grid grid-cols-2 gap-2'>
                            {products?.slice(0, 6).map((product) => {
                                
                                return (
                                <ProductCard
                                    key={product?.id}
                                    className='border border-black !rounded-none'
                                    product={product}
                                />
                            )})}
                        </div>
                    </div>
                    <Footer />
                </Box>
            </Drawer>
        </div>
    )
}

export default MobileViewProductDetails