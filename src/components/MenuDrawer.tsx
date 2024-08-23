import React, { useEffect, useState } from 'react';
import { Divider, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuTabs from './MenuTabs';
import { useNavigate } from 'react-router-dom';
import SubCategoriesList, { SubCategory } from './SubCategoriesList';

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
    tabsData: { key: string; label: string; id: number }[];
    selectedTab: { categoryId: number; categoryKey: string };
    onTabChange: (event: React.SyntheticEvent, categoryId: number | undefined) => void;
    subCategories: SubCategory[];
    isSubCategoryLoading: boolean;
    setSelectedTab: React.Dispatch<React.SetStateAction<{ categoryId: number; categoryKey: string }>>;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose, tabsData, selectedTab, onTabChange, isSubCategoryLoading, subCategories, setSelectedTab }) => {
    const navigate = useNavigate();
   
    const handleMyAccounts = () => {
        navigate('/login');
        onClose()
    }

    useEffect(() => {
        const mockEvent = {
            currentTarget: {},
            target: {},
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: new Event('change')
        } as React.SyntheticEvent;

        onTabChange(mockEvent, tabsData[0]?.id);
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
                    tabs={tabsData}
                    value={selectedTab}
                    setValue={setSelectedTab}
                    onTabChange={onTabChange}
                />
                <Divider/>
                <SubCategoriesList
                    subCategories={subCategories}
                    isLoading={isSubCategoryLoading}
                    onItemClick={navigateToProducts}
                />
            </div>
        </div>
    </Drawer>
    )
};

export default MenuDrawer;