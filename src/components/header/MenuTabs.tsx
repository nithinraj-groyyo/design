import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveCategoryTab } from '../../redux/categoriesSlice';



interface MenuTabsProps {
  onTabChange: (event: React.SyntheticEvent, categoryId: number | undefined, categoryKey: string | undefined) => void;
}

const CustomTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: 'black',
  },
}));

const MenuTabs: React.FC<MenuTabsProps> = ({ onTabChange }) => {
  const {activeCategoryTab, categories} = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const selectedTab = categories.find(tab => tab.key === newValue);

    if (selectedTab) {
      dispatch(setActiveCategoryTab({ categoryId: selectedTab.id, categoryKey: newValue }));
    }

    if (onTabChange) {
      onTabChange(event, selectedTab?.id, selectedTab?.key);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeCategoryTab?.categoryKey || false}
        onChange={handleChange}
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'black',
          },
        }}
        aria-label="dynamic tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        {categories?.map((tab) => (
          <CustomTab key={tab.key} value={tab.key} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default MenuTabs;