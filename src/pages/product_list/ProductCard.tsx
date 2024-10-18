import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromLocalWishlist, setLocalWishlistItems, setWishListTriggered } from '../../redux/wishlistSlice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { IProduct } from '../../types/products';
import { RootState } from '../../redux/store';
import { useAddToWishListMutation, useRemoveWishListMutation } from '../../rtk-query/wishlistApiSlice';

interface ProductCardProps {
  showDetails?: boolean;
  className?: string;
  product: IProduct;
  onRemoveFromWishlist?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ showDetails = true, className, product, onRemoveFromWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const token = JSON.parse(localStorage.getItem("authToken") as string);
  const userId = JSON.parse(localStorage.getItem('userId') as string);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {wishlistTriggered, items} = useSelector((state: RootState) => state.wishlist)

  const localWishList = JSON.parse(localStorage.getItem("localWishList") || '[]');

  const [addToWishlist] = useAddToWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();

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

  const navigateToProductDetails = () => {
    navigate(`/product-details/${product?.id}`);
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
      }      toggleWishlistState(isInWishlist);  
      return;
    }
      
    if (userId && product) {
      try {
        if (isInWishlist) {          
          await removeWishList({ productId: product?.id, token });
        } else {          
          await addToWishlist({ productId: product?.id, token });
        }        toggleWishlistState(isInWishlist);  
      } catch (error) {
        console.error('Error toggling wishlist:', error);        
      }
    }
  };
  

  
  return (
    <Card className={className}>
      <CardMedia
        component="img"
        image={(product?.productImages.find(image => image.isThumbnail === true))?.signedUrl}
        alt={product?.name}
        className="cursor-pointer"
        sx={{ objectFit: 'cover', aspectRatio: '1' }}
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

                <IconButton aria-label="add to wishlist" onClick={handleWishlistToggle}>
                  {isInWishlist ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                </IconButton>

            </Box>
            <Typography component="div" className="uppercase font-light text-xs">
              <span><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} /></span>
              <span>{product?.productPrices[0]?.pricePerPiece}</span>
            </Typography>
          </CardContent>

          {/* Mobile view  */}
          <div className='lg:hidden px-2 py-1'>
            <div className='flex justify-between items-center'>
              <div className="uppercase font-light text-xs">
                <span><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} /></span>
                <span>{product?.productPrices[0]?.pricePerPiece}</span>
              </div>
                <IconButton aria-label="add to wishlist" onClick={handleWishlistToggle}>
                  {isInWishlist ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
          </div>
        </>
      )}
      
    </Card>
  );
};

export default ProductCard;