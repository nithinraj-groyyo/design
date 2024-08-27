import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from 'react-router-dom';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  onAddToWishlist: () => void;
  showDetails?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, onAddToWishlist, showDetails = true, className }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const {categoryKey} = useParams();

  const navigate = useNavigate();

  const handleWishlistClick = () => {
    setIsFavorited(!isFavorited);
    onAddToWishlist();
  };

  const navigateToProductDetails = () => {
    navigate(`/product-details/${categoryKey}/${name}`)
  }

  return (
    <Card className={className}>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{ objectFit: 'cover', aspectRatio: "0.64" }}
        onClick={navigateToProductDetails}
      />
      {showDetails && (
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Typography component="div" className='uppercase font-light text-xs'>
              {name}
            </Typography>
            <IconButton aria-label="add to wishlist" onClick={handleWishlistClick}>
              {isFavorited ? (
                <FavoriteIcon sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
          <Typography component="div" className='uppercase font-light text-xs'>
            <span>&#8377;</span>
            <span>{price}</span>
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default ProductCard;