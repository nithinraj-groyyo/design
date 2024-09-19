import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {  IconButton } from '@mui/material';
import MenuDrawer from './MenuDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategoryTab } from '../../redux/categoriesSlice';
import useFetchCategories from '../../hooks/useFetchCategories';
import { RootState } from '../../redux/store';

const Authheaders = () => {
    const dispatch = useDispatch();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    useFetchCategories();

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
    };
    const {cart} = useSelector((state: RootState)=> state.shoppingBag)
  return (
    <div className='flex justify-between items-center fixed w-full p-2 text-black z-30'>
        <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
        </IconButton>

        <div className="flex" >
            <span className='uppercase '>Shopping Bag</span>
            <span>({cart?.savedItems?.length})</span>
        </div>
        <MenuDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </div>
  )
}

export default Authheaders