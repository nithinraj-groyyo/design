import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface TabItem {
  key: string;
  label: string;
  id: number;
}

interface MenuTabsProps {
  tabs: TabItem[];
  value: { categoryId: number; categoryKey: string };
  setValue: React.Dispatch<React.SetStateAction<{ categoryId: number; categoryKey: string }>>;
  onTabChange: (event: React.SyntheticEvent, categoryId: number | undefined) => void;
}

const CustomTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: 'black',
  },
}));

const MenuTabs: React.FC<MenuTabsProps> = ({ tabs, onTabChange, value, setValue }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const selectedTab = tabs.find(tab => tab.key === newValue);

    if (selectedTab) {
      setValue({ categoryId: selectedTab.id, categoryKey: newValue });
    }

    if (onTabChange) {
      onTabChange(event, selectedTab?.id);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value.categoryKey || false}
        onChange={handleChange}
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'black',
          },
        }}
        aria-label="dynamic tabs example"
      >
        {tabs.map((tab) => (
          <CustomTab key={tab.key} value={tab.key} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default MenuTabs;