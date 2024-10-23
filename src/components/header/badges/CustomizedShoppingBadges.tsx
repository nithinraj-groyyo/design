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

  React.useEffect(() => {
      async function loadCartList() {
          const response = await fetchCartList({}).unwrap();

          if(response?.status){
              dispatch(setCartItems(response?.data))
          }
      }
      loadCartList()
  }, [])

    const {cart} = useSelector((state: RootState)=> state.bag);
    console.log(cart?.length, "length")
  return (
    <Badge badgeContent={cart?.length} color="error">
        <ShoppingBagIcon  />
    </Badge>
  );
}