import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Button, Grid, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLazyLoadAllCategoriesWithSubCategoriesQuery } from '../../rtk-query/categoriesApiSlice';
import { ICategoryWithSubcategories } from '../../types/categories';
import CategoriesLoader from './CategoriesLoader';

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<Record<string, ICategoryWithSubcategories> | undefined>(undefined)
    const open = Boolean(anchorEl);

    const [loadAllCategoriesWithSubCategories, { isLoading, isFetching }] = useLazyLoadAllCategoriesWithSubCategoriesQuery();

    useEffect(() => {
        void loadAllCategoriesWithSubCategories()?.then((res) => {
            const responseBody = res?.data;
            setCategories(responseBody);
        })
    }, [])

    const handleMainMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMainMenuClose = () => {
        setAnchorEl(null);
        setHoveredCategory(null);
        setHoveredSubCategory(null);
    };

    const handleCategoryHover = (category: string) => {
        setHoveredCategory(category);
        setHoveredSubCategory(null);
    };

    const handleSubCategoryHover = (subcategory: string) => {
        setHoveredSubCategory(subcategory);
    };

    return (
        <div>
            <ul className="flex gap-10">
                <li>
                    <Button
                        component={Link}
                        to="/about"
                        sx={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        About Us
                    </Button>
                </li>
                <li>
                    <Button
                        component={Link}
                        to="/team"
                        sx={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        Team
                    </Button>
                </li>
                <li>
                    <Button
                        aria-controls={open ? 'categories-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMainMenuClick}
                        sx={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span>Categories</span>
                        <span>
                            <KeyboardArrowDownIcon
                                sx={{
                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                    marginLeft: '5px',
                                }}
                            />
                        </span>
                    </Button>

                    <Menu
                        id="categories-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMainMenuClose}
                        PaperProps={{
                            sx: {
                                padding: '16px',
                                display: 'flex',
                            },
                        }}
                        MenuListProps={{
                            onMouseLeave: handleMainMenuClose,
                        }}
                    >
                        {
                            (isLoading || isFetching) ? (
                                <CategoriesLoader />
                            ) : (categories && (
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <div>
                                            {Object.keys(categories).map((category) => (
                                                <MenuItem
                                                    key={category}
                                                    onMouseEnter={() => handleCategoryHover(category)}
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 3,
                                                        justifyContent: 'space-between',
                                                        backgroundColor: hoveredCategory === category ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
                                                    }}
                                                    style={{
                                                        transition: 'opacity 0.3s ease',
                                                    }}
                                                >
                                                    <span className='opacity-70 arrow-icon'>{category}</span>
                                                    <span className={`${hoveredCategory === category ? "opacity-100" : "opacity-0"}`}>
                                                        <KeyboardArrowRightIcon />
                                                    </span>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </Grid>

                                    {hoveredCategory && (
                                        <Grid item>
                                            <div>
                                                {categories[hoveredCategory]?.subcategories.map((subcat) => (
                                                    <MenuItem
                                                        key={subcat.id}
                                                        component={Link}
                                                        to={`/categories/${categories[hoveredCategory].id}/${subcat.id}`}
                                                        onClick={handleMainMenuClose}
                                                        onMouseEnter={() => handleSubCategoryHover(subcat.name)}
                                                        sx={{
                                                            backgroundColor: hoveredSubCategory === subcat.name ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                                                        }}
                                                    >
                                                        <span className='opacity-70 sub-cat'>{subcat.name}</span>
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </Grid>
                                    )}
                                </Grid>
                            ))
                        }
                    </Menu>
                </li>
                <li>
                    <Button
                        component={Link}
                        to="/services"
                        sx={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        Services
                    </Button>
                </li>
                <li>
                    <Button
                        component={Link}
                        to="/contact-us"
                        sx={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        Contact Us
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;