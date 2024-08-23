import React, { useEffect } from 'react';
import { Divider, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuTabs from './MenuTabs';
import { useNavigate } from 'react-router-dom';
import SubCategoriesList from './SubCategoriesList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveCategoryTab } from '../redux/categoriesSlice';
import { useFetchSubCategories } from '../hooks/useFetchCategories';

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
    onTabChange: (event: React.SyntheticEvent, categoryId: number | undefined) => void;
    
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose, onTabChange }) => {
    const navigate = useNavigate();
   
    const handleMyAccounts = () => {
        navigate('/login');
        onClose()
    }

    const {categories} = useSelector((state: RootState) => state.categories);

    const dispatch = useDispatch();

    const { fetchSubCategories } = useFetchSubCategories();

    useEffect(() => {
        dispatch(setActiveCategoryTab({ categoryId: categories[0]?.id || -1, categoryKey: categories[0]?.key }));
        fetchSubCategories(categories[0]?.id )
    }, []);

    const navigateShoppingBag = () => {
        navigate('/bag');
        onClose()
    }

    const navigateToProducts = () => {
        console.log('Navigating to products page...');
    };

    return (<Drawer
        anchor='left'
        open={open}
        onClose={onClose}
        classes={{ paper: 'w-full h-full' }}
        className='lg:hidden'
    >
        <div className="flex flex-col p-4">
            <div className='flex justify-between'>

                <IconButton onClick={onClose} className='self-start'>
                    <CloseIcon />
                </IconButton>
                <div className="lg:hidden flex gap-4 items-center" >
                    <div className="cursor-pointer text-sm" onClick={handleMyAccounts}>MY ACCOUNT</div>
                    <div className="cursor-pointer text-sm" onClick={navigateShoppingBag}>SHOPPING BAG (0)</div>
                </div>
            </div>
            <div>
                <MenuTabs
                    onTabChange={onTabChange}
                />
                <Divider/>
                <SubCategoriesList
                    onItemClick={navigateToProducts}
                />
            </div>
        </div>
    </Drawer>
    )
};

export default MenuDrawer;