import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingBagIcon } from '../../../assets/svg/home/ShoppingBagIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useLazyFetchCartListQuery } from '../../../rtk-query/cartApiSlice';
import { setCartItems } from '../../../redux/bagSlice';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedShoppingBadges() {
  const dispatch = useDispatch();
  const [fetchCartList] = useLazyFetchCartListQuery({});
  const token = JSON.parse(localStorage.getItem("authToken") as string);
  const userId = JSON.parse(localStorage.getItem("userId") as string);

  const {cart} = useSelector((state: RootState)=> state.bag);
console.log("cart", cart)
  React.useEffect(() => {
    async function loadCartList() {
      try {
        const response = await fetchCartList({ token }).unwrap();
        if (response?.status) {
          dispatch(
            setCartItems({
              data: response?.data?.data,
              totalPrice: response?.data?.totalPrice,
              cartId: response?.data?.cartId,
            })
          );
        }
      } catch (error) {
        console.error("Failed to load cart list", error);
      }
    }
  
  
    if (!Boolean(cart?.cartId) && Boolean(token)) {
      loadCartList();
    }
  }, [cart?.cartId, token, dispatch]);


  return (
    <Badge badgeContent={cart?.data?.length} color="error">
        <ShoppingBagIcon  />
    </Badge>
  );
}