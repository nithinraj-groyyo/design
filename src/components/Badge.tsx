import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingBagIcon } from '../assets/svg/home/ShoppingBagIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedShoppingBadges() {
    const {cart} = useSelector((state: RootState)=> state.shoppingBag)
  return (
    <Badge badgeContent={cart?.savedItems?.length} color="error">
        <ShoppingBagIcon  />
    </Badge>
  );
}