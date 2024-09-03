import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MenuDrawer from './MenuDrawer';
import { setActiveCategoryTab } from '../../redux/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCategories from '../../hooks/useFetchCategories';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const MobileHeader = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useFetchCategories();

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
    };
    const {cart} = useSelector((state: RootState)=> state.shoppingBag)

    const handleNavigationToShoppingBag = () => {
        navigate("/bag")
    }
  return (
    <div className='flex justify-between items-center fixed w-full p-2 text-black z-30 h-[3rem]'>
        <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
        </IconButton>

        <div className="flex" onClick={handleNavigationToShoppingBag}>
            <span className='uppercase '>Shopping Bag</span>
            <span>({cart?.savedItems?.length})</span>
        </div>
        <MenuDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </div>
  )
}

export default MobileHeader