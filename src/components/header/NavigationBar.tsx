import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Button, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { motion } from "framer-motion";
import { useLazyLoadAllCategoriesWithSubCategoriesQuery } from "../../rtk-query/categoriesApiSlice";
import { ICategoryWithSubcategories } from "../../types/categories";
import CategoriesLoader from "./CategoriesLoader";

const NavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Record<string, ICategoryWithSubcategories> | undefined>(undefined);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const [loadAllCategoriesWithSubCategories, { isLoading, isFetching }] = useLazyLoadAllCategoriesWithSubCategoriesQuery();

  useEffect(() => {
    void loadAllCategoriesWithSubCategories()?.then((res) => {
      const responseBody = res?.data;
      setCategories(responseBody);
    });
  }, []);

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <ul className="flex justify-between">
        <li>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: isActive("/about") ? "#ee572f" : "black",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <motion.span
              className="whitespace-nowrap"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About Us
            </motion.span>
          </Button>
        </li>
        <li>
          <Button
            component={Link}
            to="/team"
            sx={{
              color: isActive("/team") ? "#ee572f" : "black",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <motion.span
              className="whitespace-nowrap"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Team
            </motion.span>
          </Button>
        </li>
        <li>
          <Button
            aria-controls={open ? "categories-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMainMenuClick}
            sx={{
              color: "black",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              display: "flex",
              alignItems: "center",
            }}
          >
            <motion.span
              className="whitespace-nowrap"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Categories
            </motion.span>
            <motion.span className="whitespace-nowrap" initial={{ rotate: 0 }} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <KeyboardArrowDownIcon sx={{ marginLeft: "5px" }} />
            </motion.span>
          </Button>

          <Menu
            id="categories-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMainMenuClose}
            PaperProps={{
              sx: {
                padding: "16px",
                display: "flex",
              },
            }}
            MenuListProps={{
              onMouseLeave: handleMainMenuClose,
            }}
          >
            {isLoading || isFetching ? (
              <CategoriesLoader />
            ) : (
              categories && (
                <Grid container spacing={2}>
                  <Grid item>
                    <div>
                      {Object.keys(categories).map((category) => (
                        <MenuItem
                          key={category}
                          onMouseEnter={() => handleCategoryHover(category)}
                          sx={{
                            display: "flex",
                            gap: 3,
                            justifyContent: "space-between",
                            backgroundColor: hoveredCategory === category ? "rgba(0, 0, 0, 0.1)" : "transparent",
                          }}
                        >
                          <span className="opacity-70 arrow-icon">{category}</span>
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
                              backgroundColor: hoveredSubCategory === subcat.name ? "rgba(0, 0, 0, 0.05)" : "transparent",
                            }}
                          >
                            <span className="opacity-70 sub-cat">{subcat.name}</span>
                          </MenuItem>
                        ))}
                      </div>
                    </Grid>
                  )}
                </Grid>
              )
            )}
          </Menu>
        </li>
        <li>
          <Button
            component={Link}
            to="/services"
            sx={{
              color: isActive("/services") ? "#ee572f" : "black",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <motion.span
              className="whitespace-nowrap"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Services
            </motion.span>
          </Button>
        </li>
        <li>
          <Button
            component={Link}
            to="/contact-us"
            sx={{
              color: isActive("/contact-us") ? "#ee572f" : "black",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <motion.span
              className="whitespace-nowrap"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact Us
            </motion.span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
