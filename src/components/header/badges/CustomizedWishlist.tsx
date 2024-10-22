import React, { useEffect, useState } from 'react'; 
import { Badge } from '@mui/material'
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useLazyGetWishlistQuery } from '../../../rtk-query/wishlistApiSlice';
import { setWishlistItems } from '../../../redux/wishlistSlice';

const CustomizedWishlist = () => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    const token = JSON.parse(localStorage.getItem("authToken") as string);

    const [badgeCount, setBadgeCount] = useState(0);

    const {wishlistTriggered, items} = useSelector((state: RootState) => state.wishlist);

    const [getWishlist, {data}] = useLazyGetWishlistQuery();

    const dispatch = useDispatch();

    async function getWishListFromCloud(){
        await getWishlist({token})
    }

    useEffect(() => {
        if(!userId){
            const localWishList = JSON.parse(localStorage.getItem("localWishList") || '[]');
            setBadgeCount(localWishList?.length);
        }else if (userId){
            getWishListFromCloud();
        }
    }, [wishlistTriggered]);

    useEffect(() => {
        const wishlist = data?.data;            
        dispatch(setWishlistItems(wishlist));
    },[data]);

  return (
    <Badge badgeContent={!userId ? badgeCount : items?.length} color="error">
        <FavoriteBorderOutlined  />
    </Badge>
  )
}

export default CustomizedWishlist