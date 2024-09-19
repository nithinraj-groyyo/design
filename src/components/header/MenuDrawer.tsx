import React, { useState, useEffect } from 'react';
import { Divider, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import MenuTabs from './MenuTabs';
import SubCategoriesList from './SubCategoriesList';
import { useFetchSubCategories } from '../../hooks/useFetchSubCategories';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
    const navigate = useNavigate();

    const { categories } = useSelector((state: RootState) => state.categories);
    const { cart } = useSelector((state: RootState) => state.shoppingBag);

    const [activeCategoryTab, setActiveCategoryTab] = useState<{ categoryId: number; categoryKey: string } | null>(null);

    const { fetchSubCategories } = useFetchSubCategories();

    useEffect(() => {
        const fetchInitialData = async () => {
            if (categories.length > 0) {
                const firstCategory = categories[0];
                setActiveCategoryTab({ categoryId: firstCategory.id, categoryKey: firstCategory.key });
                fetchSubCategories(firstCategory.id);
            }
        };

        fetchInitialData();
    }, [categories, fetchSubCategories]);

    const handleTabChange = (event: React.SyntheticEvent, categoryId: number | undefined, categoryKey: string | undefined) => {
        if (categoryId && categoryKey) {
            setActiveCategoryTab({ categoryId, categoryKey });
            fetchSubCategories(categoryId);
        }
    };

    const handleMyAccounts = () => {
        navigate('/login');
        onClose();
    };

    const navigateShoppingBag = () => {
        navigate('/bag');
        onClose();
    };

    const navigateToProducts = () => {
        if (activeCategoryTab) {
            navigate(`/designs/${activeCategoryTab.categoryKey}/${activeCategoryTab.categoryId}`);
            setActiveCategoryTab(null);
            onClose();
        }
    };

    return (
        <Drawer
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
                    <div className="lg:hidden flex gap-4 items-center">
                        <div className="cursor-pointer text-sm" onClick={handleMyAccounts}>MY ACCOUNT</div>
                        <div className="cursor-pointer text-sm" onClick={navigateShoppingBag}>SHOPPING BAG ({cart?.savedItems?.length})</div>
                    </div>
                </div>
                <div>
                    <MenuTabs
                        onTabChange={handleTabChange}
                    />
                    <Divider />
                    <SubCategoriesList
                        onItemClick={navigateToProducts}
                    />
                </div>
            </div>
        </Drawer>
    );
};

export default MenuDrawer;