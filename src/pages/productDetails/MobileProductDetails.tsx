import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLazyFetchProductsQuery, useLazyGetProductByIdQuery } from '../../rtk-query/productApiSlice';
import { IProduct } from '../../types/products';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Drawer, IconButton, Link, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromLocalWishlist, setLocalWishlistItems, setWishListTriggered } from '../../redux/wishlistSlice';
import { useAddToWishListMutation, useRemoveWishListMutation } from '../../rtk-query/wishlistApiSlice';
import ProductDrawer from './ProductDrawer';
import ProductCard from '../product_list/ProductCard';
import Footer from '../../components/footer/Footer';

const MobileProductDetails = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<IProduct>();

    const userId = JSON.parse(localStorage.getItem('userId') as string);
    const token = JSON.parse(localStorage.getItem("authToken") as string);
    const localWishList = JSON.parse(localStorage.getItem("localWishList") || '[]');

    const [expanded, setExpanded] = useState(false);
    const [drawerHeight, setDrawerHeight] = useState(25);
    const [isViewMore, setIsViewMore] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { wishlistTriggered, items } = useSelector((state: RootState) => state.wishlist)
    const [addToWishlist] = useAddToWishListMutation();
    const [removeWishList] = useRemoveWishListMutation();

    const [fetchProducts, { data: products = [], isLoading: isProductLoading }] = useLazyFetchProductsQuery();
    const [getProductById, { data }] = useLazyGetProductByIdQuery();

    const dispatch = useDispatch();

    const loadProducts = async () => {
        await fetchProducts({
            page: 1,
            limit: 10,
            isProductActive: true
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (productId) {
            void getProductById({ productId: +productId });
        }
    }, [productId]);

    useEffect(() => {
        if (data?.data) {
            setProduct(data?.data);
        }
    }, [data]);

    useEffect(() => {
        if(product){
         if (!userId) {
           setIsInWishlist(localWishList.includes(product?.id));
         }else{
           const itemIds: number[] = items?.map((item) => item?.id)
           setIsInWishlist(itemIds?.includes(product?.id));
         }
        }
       }, [product, localWishList, wishlistTriggered, items]);


    const toggleDrawerHeight = () => {
        setExpanded(!expanded);
        setDrawerHeight(expanded ? 25 : 90);
    };

    const handleViewMore = () => {
        setIsViewMore(!isViewMore);
    };

    const handleWishlistToggle = async () => {
        const toggleWishlistState = (isInWishlist: boolean) => {
            setIsInWishlist(!isInWishlist);
            dispatch(setWishListTriggered(!wishlistTriggered));
        };

        if (!userId && product) {
            if (isInWishlist) {
                dispatch(removeFromLocalWishlist({ productId: product?.id }));
            } else {
                dispatch(setLocalWishlistItems({ productId: product?.id }));
            } toggleWishlistState(isInWishlist);
            return;
        }

        if (userId && product) {
            try {
                if (isInWishlist) {
                    await removeWishList({ productId: product?.id, token });
                } else {
                    await addToWishlist({ productId: product?.id, token });
                } toggleWishlistState(isInWishlist);
            } catch (error) {
                console.error('Error toggling wishlist:', error);
            }
        }
    };

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    }

    return (
        <div className='lg:hidden'>
            <div style={{ marginBottom: `${drawerHeight}vh` }}>
                {product?.productImages?.map((image) => (
                    <div key={image?.id}>
                        <img
                            src={image?.signedUrl}
                            alt={product?.name}
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
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                        cursor: "pointer",
                    }}
                    onClick={toggleDrawerHeight}
                >
                    <IconButton>
                        {!expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>


                <Box sx={{ padding: "0 16px" }}>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-black font-bold max-w-xs">{product?.name}</h1>
                            <button className="p-2" onClick={handleWishlistToggle}>
                                {isInWishlist ? (
                                    <FavoriteIcon sx={{ color: "red" }} />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </button>
                        </div>
                        <div className="font-semibold">
                            <CurrencyRupeeIcon sx={{ fontSize: "inherit" }} />
                            <span>{product?.productPrices[0]?.pricePerPiece}</span>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                fullWidth
                                className='!my-2 !bg-black !text-white'
                                onClick={handleOpenDrawer}
                            >
                                Select Variants
                            </Button>
                        </div>
                        <div className="py-2">{product?.description}</div>
                    </div>
                </Box>


                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                    }}
                >
                    <Accordion
                        expanded={isViewMore}
                        onChange={handleViewMore}
                        sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="text-[#8E8E8E] text-sm whitespace-nowrap font-semibold text-left">
                                COMPOSITION, CARE AND ORIGIN
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex flex-col gap-4'>
                                <div className="flex flex-col ">
                                    <Typography className="text-[#8E8E8E] text-xs font-semibold text-left">
                                        {product?.leftTopHeader}
                                    </Typography>
                                    <Typography className="text-xs 2xl:text-sm text-[#8E8E8E]">
                                        {product?.leftTopContent}
                                    </Typography>
                                </div>
                                <div className="flex flex-col ">
                                    <Typography className="text-[#8E8E8E] text-xs font-semibold text-left">
                                        {product?.leftBottomHeader}
                                    </Typography>
                                    <Typography className="text-xs 2xl:text-sm text-[#8E8E8E]">
                                        {product?.leftBottomContent}
                                    </Typography>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <div className="flex lg:hidden flex-col gap-4 my-2">
                        <p className="text-[#2D2D2A] tracking-widest font-semibold px-4">
                            YOU MAY ALSO LIKE
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mx-1">
                            {products?.data &&
                                products?.data?.slice(0, 6).map((product: any) => {
                                    return (
                                        <ProductCard
                                            key={product?.id}
                                            product={product}
                                            className='!rounded-lg shadow-md'
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <Footer />
                    <ProductDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} product={product!} />
                </Box>
            </Drawer>
        </div>
    )
}

export default MobileProductDetails