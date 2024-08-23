import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { SignInIcon } from '../assets/svg/SignInIcon';
import { WishlistIcon } from '../assets/svg/WishlistIcon';
import { ShoppingBagIcon } from '../assets/svg/ShoppingBagIcon';
import useAuth from '../hooks/useAuth';

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
    { icon: <WishlistIcon />, label: "wishlist", redirect: "/wishlist", id: "wishlist" },
    { icon: <ShoppingBagIcon />, label: "shopping bag", redirect: "/bag", id: "bag" },
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
    const location = useLocation();


    const filteredIconButtons = isAuthenticated
        ? iconButtons.filter(button => button.id !== 'login').filter(button => location.pathname !== "/bag" || button.id !== "bag")
        : location?.pathname === "/bag" ? iconButtons.filter(button => button.id !== "bag") : iconButtons;

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
        </div>
    );
};

export default HeaderIcons;