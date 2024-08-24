import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface SubCategoriesListProps {
    onItemClick: () => void;
}

const SubCategoriesList: React.FC<SubCategoriesListProps> = ({ onItemClick }) => {
    const {isSubCategoriesLodaing, subCategories} = useSelector((state: RootState) => state.categories);

    return(
    <List className="mt-2">
        {isSubCategoriesLodaing ? (
            <div className="flex justify-center items-center p-2">
                <CircularProgress />
            </div>
        ) : subCategories.length > 0 ? (
            subCategories.map((category) => (
                <ListItem key={category.id} disablePadding>
                    <ListItemButton onClick={onItemClick}>
                        <ListItemText primary={category.name} />
                    </ListItemButton>
                </ListItem>
            ))
        ) : (
            <div className="flex justify-center items-center p-2">
                <Typography>No Collections</Typography>
            </div>
        )}
    </List>
)};

export default SubCategoriesList;