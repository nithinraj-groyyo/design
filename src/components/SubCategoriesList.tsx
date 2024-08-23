import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Typography } from '@mui/material';

export interface SubCategory {
    id: number;
    name: string;
}

interface SubCategoriesListProps {
    subCategories: SubCategory[];
    isLoading: boolean;
    onItemClick: () => void;
}

const SubCategoriesList: React.FC<SubCategoriesListProps> = ({ subCategories, isLoading, onItemClick }) => (
    <List className="mt-2">
        {isLoading ? (
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
);

export default SubCategoriesList;