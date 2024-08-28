import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {  IconButton } from '@mui/material';
import MenuDrawer from './MenuDrawer';
import { useDispatch } from 'react-redux';
import { setActiveCategoryTab } from '../../redux/categoriesSlice';
import useFetchCategories from '../../hooks/useFetchCategories';

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
  return (
    <div className='flex justify-between items-center fixed w-full p-2 text-black z-20'>
        <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
        </IconButton>

        <div className="flex" >
            <span className='uppercase '>Shopping Bag</span>
            <span>(0)</span>
        </div>
        <MenuDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </div>
  )
}

export default Authheaders