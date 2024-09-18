import React, { useState } from 'react';
import { Menu, MenuItem, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const open = Boolean(anchorEl);

    const subcategories: Record<string, string[]> = {
        Electronics: ['Phones', 'Computers', 'Accessories'],
        Clothing: ['Men', 'Women', 'Kids'],
        Home: ['Furniture', 'Decor', 'Appliances'],
    };

    const handleMainMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMainMenuClose = () => {
        setAnchorEl(null);
        setSelectedCategory(null);
    };

    const handleCategoryHover = (category: string) => {
        setSelectedCategory(category);
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
                        <Grid container spacing={2}>
                            <Grid item>
                                <div>
                                    {Object.keys(subcategories).map((category) => (
                                        <MenuItem
                                            key={category}
                                            onMouseEnter={() => handleCategoryHover(category)}
                                            sx={{
                                                display: 'flex',
                                                gap: 3,
                                                justifyContent: 'space-between',
                                                '&:hover .arrow-icon': {
                                                    opacity: 1,
                                                },
                                            }}
                                            style={{
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        >
                                            <span className='opacity-70 arrow-icon'>{category}</span>
                                            <span
                                                className="opacity-0 arrow-icon"
                                            >
                                                <KeyboardArrowRightIcon />
                                            </span>
                                        </MenuItem>
                                    ))}
                                </div>
                            </Grid>

                            {selectedCategory && (
                                <Grid item>
                                    <div>
                                        {subcategories[selectedCategory].map((subcat) => (
                                            <MenuItem
                                                key={subcat}
                                                component={Link}
                                                to={`/categories/${selectedCategory.toLowerCase()}/${subcat.toLowerCase()}`}
                                                onClick={handleMainMenuClose}
                                                sx={{
                                                    '&:hover .sub-cat': {
                                                        opacity: 1,
                                                    },
                                                }}
                                            >
                                                <span className='opacity-70 sub-cat'>{subcat}</span>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </Grid>
                            )}
                        </Grid>
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
