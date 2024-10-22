import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MenuDrawer from './MenuDrawer';
import { useNavigate } from 'react-router-dom';
import CustomizedWishlist from './badges/CustomizedWishlist';
import CustomizedShoppingBadges from './badges/CustomizedShoppingBadges';

const MobileHeader = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [isAccountOpened, setIsAccountOpened] = useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setIsAccountOpened(false)
    };

    const navigateToHomePage = () => {
        navigate("/");
      };

  return (
    <div className='flex justify-between items-center fixed w-full mb-3 px-3 py-10 text-black z-30 h-[3rem] bg-white shadow-sm'>
        <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
        </IconButton>

        <div className="cursor-pointer">
          <img
            src="/images/Groyyo_Studio_Logo.png"
            className="w-16 h-16"
            onClick={navigateToHomePage}
          />
        </div>

        <div className='flex flex-row gap-5'>
            <CustomizedWishlist />
            <CustomizedShoppingBadges />
        </div>
        <MenuDrawer open={drawerOpen} onClose={handleDrawerClose} setIsAccountOpened={setIsAccountOpened} isAccountOpened={isAccountOpened} />
    </div>
  )
}

export default MobileHeader