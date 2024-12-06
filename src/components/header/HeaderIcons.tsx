import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { SignInIcon } from '../../assets/svg/home/SignInIcon';
import useAuth from '../../hooks/useAuth';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CustomizedShoppingBadges from './badges/CustomizedShoppingBadges';
import useSignOut from '../../hooks/useSignOut';
import SignOutModal from './SignOutModal';
import CustomizedWishlist from './badges/CustomizedWishlist';
import { useGetSubscriptionInfoQuery } from '../../rtk-query/subscriptonApiSlice';

interface IconButtonConfig {
    icon: React.ReactNode;
    label: string;
    redirect: string;
    id: string;
}

interface IconsButtonProps {
    icon: React.ReactNode;
    label: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

interface HeaderIconsProps {
    handleMouseLeaveButton?: () => void;
    handleMouseEnterButton?: () => void;
}

const iconButtons: IconButtonConfig[] = [
    { icon: <SignInIcon />, label: "sign in", redirect: "/login", id: "login" },
    { icon: <CustomizedWishlist />, label: "wishlist", redirect: "/wishlist", id: "wishlist" },
    { icon: <CustomizedShoppingBadges />, label: "shopping bag", redirect: "/bag", id: "bag" },
];

const IconsButton: React.FC<IconsButtonProps> = ({ icon, label, onMouseEnter, onMouseLeave }) => {
    return (
        <button
            className="flex flex-col items-center my-auto whitespace-nowrap"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {typeof icon === 'string' ? (
                <img loading="lazy" src={icon} alt={label} className="object-contain w-5 h-5" />
            ) : (
                <div className="w-5 h-5">{icon}</div>
            )}
            <span className="mt-2">{label}</span>
        </button>
    );
};

const HeaderIcons: React.FC<HeaderIconsProps> = ({ handleMouseLeaveButton, handleMouseEnterButton }) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuNavigation = (path: string) => {
        navigate(`/account/${path}`);
        handleMenuClose();
    };

    const filteredIconButtons = isAuthenticated
        ? iconButtons.filter(button => button.id !== 'login')
        : iconButtons;

    const { signOut } = useSignOut();

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Fetch subscription data
    const { data: subscriptionData = [] } = useGetSubscriptionInfoQuery({
        token: JSON.parse(localStorage.getItem("authToken") as string),
    });

    console.log(subscriptionData,"Data")

    return (
        <div className="xxs:hidden lg:flex gap-[3rem] items-center">
            {filteredIconButtons.map((button, index) => (
                <Link to={button.redirect} key={index}>
                    <IconsButton
                        icon={button.icon}
                        label={button.label}
                        onMouseEnter={button.id === "bag" ? handleMouseEnterButton : undefined}
                        onMouseLeave={button.id === "bag" ? handleMouseLeaveButton : undefined}
                    />
                </Link>
            ))}

            {isAuthenticated && (
                <div className="flex flex-col items-center justify-between my-auto whitespace-nowrap">
                    <div
                        className={`!p-1 rounded-full ${
                            subscriptionData?.data && subscriptionData?.data.length > 0 ? "!bg-yellow-500" : ""
                        }`}
                    >
                        <IconButton
                            className="!w-9 !h-9"
                            onClick={handleMenuClick}
                        >
                            <PersonIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <Typography>accounts</Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={() => handleMenuNavigation("profile")}>Account Settings</MenuItem>
                        <MenuItem onClick={() => handleMenuNavigation("orders")}>Orders</MenuItem>
                        <MenuItem onClick={() => handleMenuNavigation("address")}>Address</MenuItem>
                        {isAuthenticated && <MenuItem onClick={handleSignOutClick}>Sign Out</MenuItem>}

                        <SignOutModal
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmSignOut}
                        />
                    </Menu>
                </div>
            )}
        </div>
    );
};

export default HeaderIcons;
