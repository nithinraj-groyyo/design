import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Drawer, IconButton, Collapse, CircularProgress, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SignOutModal from './SignOutModal';
import useSignOut from '../../hooks/useSignOut';
import { ICategoryWithSubcategories } from '../../types/categories';
import { useLazyLoadAllCategoriesWithSubCategoriesQuery } from '../../rtk-query/categoriesApiSlice';
import CustomizedShoppingBadges from './badges/CustomizedShoppingBadges';

interface MenuDrawerProps {
    open: boolean;
    isAccountOpened?: boolean;
    onClose: () => void;
    setIsAccountOpened?: (val: boolean) => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose, isAccountOpened, setIsAccountOpened }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticated = useAuth();
    const { signOut } = useSignOut();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState(false);

    const [categories, setCategories] = useState<Record<string, ICategoryWithSubcategories> | undefined>(undefined);

    const [loadAllCategoriesWithSubCategories, { isLoading, isFetching }] = useLazyLoadAllCategoriesWithSubCategoriesQuery();

    useEffect(() => {
        void loadAllCategoriesWithSubCategories()?.then((res) => {
            const responseBody = res?.data;
            setCategories(responseBody);
        });
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleMyAccounts = () => {
        handleNavigation('/login');
    };

    const navigateShoppingBag = () => {
        handleNavigation('/bag');
    };

    const handleSignOutClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmSignOut = () => {
        signOut();
        window.location.href = '/login';
    };

    const isActive = (path: string) => showCategories ? false : location.pathname === path;


    const handleCategoryClick = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const getActiveSubCategory = (subcatId: number) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('subcategoryId') === String(subcatId);
    };

    const handleCloseIcon = () => {
        if (setIsAccountOpened) {
            isAccountOpened ? setIsAccountOpened(false) : onClose();
        } else {
            onClose();
        }
    };

    const handleAccountList = () => {
        if(setIsAccountOpened){
            setIsAccountOpened(true)
        }
    }

    return (
        <>
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                classes={{ paper: 'w-full h-full' }}
            >
                <div className="flex flex-col p-4 ">
                    <div className="flex justify-between">
                        <IconButton onClick={handleCloseIcon} className="self-start">
                            <CloseIcon />
                        </IconButton>
                        <div className="lg:hidden flex gap-4 items-center">
                            {!isAuthenticated && (
                                <div className="cursor-pointer text-sm" onClick={handleMyAccounts}>
                                    SIGN IN
                                </div>
                            )}

                            <div className=' flex gap-5 items-center'>
                                <div className="cursor-pointer text-sm" onClick={navigateShoppingBag}>
                                    <CustomizedShoppingBadges />
                                </div>
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                    }}
                                    onClick={handleAccountList}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        isAccountOpened ? (
                            <List className="mt-4">
                                <ListItem
                                    onClick={() => handleNavigation('/account/profile')}
                                    sx={{
                                        backgroundColor: isActive('/account/profile') ? '#f0f0f0' : 'transparent',
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                <ListItem
                                    onClick={() => handleNavigation('/account/address')}
                                    sx={{
                                        backgroundColor: isActive('/account/address') ? '#f0f0f0' : 'transparent',
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <ListItemText primary="Addresses" />
                                </ListItem>
                                <ListItem
                                    onClick={() => handleNavigation('/account/changePassword')}
                                    sx={{
                                        backgroundColor: isActive('/account/changePassword') ? '#f0f0f0' : 'transparent',
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <ListItemText primary="Change Password" />
                                </ListItem>
                                <ListItem
                                    onClick={handleSignOutClick}
                                    sx={{
                                        borderRadius: '0.25rem',
                                    }}
                                >
                                    <ListItemText primary="Sign Out" />
                                </ListItem>
                            </List>
                        ) : (
                            <>
                                <List className="mt-4">
                                    <ListItem
                                        onClick={() => handleNavigation('/about')}
                                        sx={{
                                            backgroundColor: isActive('/about') ? '#f0f0f0' : 'transparent',
                                            borderRadius: '0.25rem',
                                        }}
                                    >
                                        <ListItemText primary="About Us" />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => handleNavigation('/team')}
                                        sx={{
                                            backgroundColor: isActive('/team') ? '#f0f0f0' : 'transparent',
                                            borderRadius: '0.25rem',
                                        }}
                                    >
                                        <ListItemText primary="Team" />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => handleNavigation('/services')}
                                        sx={{
                                            backgroundColor: isActive('/services') ? '#f0f0f0' : 'transparent',
                                            borderRadius: '0.25rem',
                                        }}
                                    >
                                        <ListItemText primary="Services" />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => handleNavigation('/contact-us')}
                                        sx={{
                                            backgroundColor: isActive('/contact-us') ? '#f0f0f0' : 'transparent',
                                            borderRadius: '0.25rem',
                                        }}
                                    >
                                        <ListItemText primary="Contact Us" />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => setShowCategories(!showCategories)}
                                        sx={{
                                            backgroundColor: showCategories ? '#f0f0f0' : 'transparent',
                                            borderRadius: '0.25rem',
                                        }}
                                    >
                                        <ListItemText primary="Categories" />
                                    </ListItem>
                                </List>

                                {isLoading || isFetching ? (
                                    <div className="flex justify-center">
                                        <CircularProgress />
                                    </div>
                                ) : categories ? showCategories && (
                                    <List>
                                        {Object.keys(categories).map((category) => (
                                            <div key={category}>
                                                <ListItem
                                                    button
                                                    onClick={() => handleCategoryClick(category)}
                                                    sx={{
                                                        backgroundColor:
                                                            expandedCategory === category ? '#e0e0e0' : 'transparent',
                                                        borderRadius: '0.25rem',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <ListItemText primary={category} />
                                                    {expandedCategory === category ? (
                                                        <ExpandLessIcon />
                                                    ) : (
                                                        <ExpandMoreIcon />
                                                    )}
                                                </ListItem>


                                                <Collapse in={expandedCategory === category} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {categories[category].subcategories.map((subcat) => (
                                                            <ListItem
                                                                key={subcat.id}
                                                                button
                                                                onClick={() =>
                                                                    handleNavigation(
                                                                        `/designs/${categories[category].id}?subcategoryId=${subcat.id}`
                                                                    )
                                                                }
                                                                sx={{
                                                                    pl: 4,
                                                                    backgroundColor: getActiveSubCategory(subcat.id)
                                                                        ? '#f0f0f0'
                                                                        : 'transparent',
                                                                }}
                                                            >
                                                                <ListItemText primary={subcat.name} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Collapse>
                                            </div>
                                        ))}
                                    </List>
                                ) : (
                                    <p>No Categories Available</p>
                                )}
                            </>
                        )
                    }




                </div>
            </Drawer>


            <SignOutModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmSignOut}
            />
        </>
    );
};

export default MenuDrawer;