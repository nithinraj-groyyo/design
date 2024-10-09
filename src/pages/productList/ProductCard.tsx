import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from 'react-router-dom';
import { updateWishlistResponse } from '../../api/userApi';
import { getImagesFromUrl } from '../../utilities/helper';
import useFetchProducts from '../../hooks/useFetchProducts';
import { useDispatch } from 'react-redux';
import { updateProductWishlist, updateSingleProductWishlist } from '../../redux/productsSlice';
import { toast } from 'react-toastify';
import { setLocalWishlistItems } from '../../redux/wishlistSlice';

interface ProductCardProps {
  showDetails?: boolean;
  className?: string;
  isAlreadyInWishlist?: boolean;
  product: any;
  onRemoveFromWishlist?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ showDetails = true, className, isAlreadyInWishlist = false, product, onRemoveFromWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId') as string);
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsInWishlist(product?.WishLists?.length > 0 ? product?.WishLists[0]?.productId === product?.id : false)
  }, [isInWishlist, product])

  const navigateToProductDetails = () => {
    navigate(`/product-details/${categoryKey}/${product?.id}`);
  };

  const handleWishlistToggle = async () => {
    if (!userId && product) {
      dispatch(setLocalWishlistItems({ product }))
      return
    }
    try {
      const add = !isInWishlist;
      const response = await updateWishlistResponse({ add, productId: product?.id, userId });
      if (response) {
        setIsInWishlist(add);
        dispatch(updateSingleProductWishlist({ isInWishlist: add, productId: product?.id }))
        dispatch(updateProductWishlist({ isInWishlist: add, productId: product?.id }));
      }
    } catch (error: any) {
      console.error('Error updating wishlist:', error?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if(!userId){
      dispatch(setLocalWishlistItems({product}))
      return 
    }
    try {
      const response = await updateWishlistResponse({ add: false, productId: product.id, userId });
      if (response) {
        toast.success("Removed from WishList")
        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(product.id);
        }
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Unable to remove from Wishlist")
    }
  }
  return (
    <Card className={className}>
      <CardMedia
        component="img"
        image={getImagesFromUrl(product?.CoverImageLink ?? product?.image)}
        alt={product?.name}
        className="cursor-pointer"
        sx={{ objectFit: 'cover', aspectRatio: '0.64' }}
        onClick={navigateToProductDetails}
      />
      {showDetails && (
        <>
          {/* Desktop view  */}
          <CardContent className='hidden lg:block'>
            <Box display="flex" justifyContent="space-between" alignItems="start">
              <Typography component="div" className="uppercase font-light text-xs">
                {product?.name}
              </Typography>
              {!isAlreadyInWishlist && (
                <IconButton aria-label="add to wishlist" onClick={handleWishlistToggle}>
                  {isInWishlist ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                </IconButton>
              )}
            </Box>
            <Typography component="div" className="uppercase font-light text-xs">
              <span>&#8377;</span>
              <span>{product?.price}</span>
            </Typography>
          </CardContent>

          {/* Mobile view  */}
          <div className='lg:hidden px-2 py-1'>
            <div className='flex justify-between items-center'>
              <div className="uppercase font-light text-xs">
                <span>&#8377;</span>
                <span>{product?.price}</span>
              </div>
              {!isAlreadyInWishlist && (
                <IconButton aria-label="add to wishlist" onClick={handleWishlistToggle}>
                  {isInWishlist ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                </IconButton>
              )}
            </div>
          </div>
        </>
      )}
      {isAlreadyInWishlist && <Button className='!bg-black !text-white uppercase !p-2 cursor-pointer !rounded-none' fullWidth onClick={handleRemoveFromWishlist}>Remove</Button>}
    </Card>
  );
};

export default ProductCard;