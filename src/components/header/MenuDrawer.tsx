import React, { useEffect } from 'react';
import { Divider, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveCategoryTab } from '../../redux/categoriesSlice';
import { useFetchSubCategories } from '../../hooks/useFetchCategories';
import MenuTabs from './MenuTabs';
import SubCategoriesList from './SubCategoriesList';

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
    onTabChange: (event: React.SyntheticEvent, categoryId: number | undefined, categoryKey: string | undefined) => void;
    
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose, onTabChange }) => {
    const navigate = useNavigate();
   
    const handleMyAccounts = () => {
        navigate('/login');
        onClose()
    }

    const {categories, activeCategoryTab} = useSelector((state: RootState) => state.categories);

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
        navigate(`/designs/${activeCategoryTab?.categoryKey}/${activeCategoryTab?.categoryId}`)
        dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
        onClose()
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