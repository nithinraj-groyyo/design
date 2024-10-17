import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CategroiesTable from "./CategroiesTable";
import SubCategoriesTable from "./SubCategoriesTable";
import AddCategoriesModal from "./AddCategoriesModal";
import AddSubCategoriesModal from "./AddSubCategoriesModal";
import { useLazyLoadAllCategoriesWithSubCategoriesQuery, useLoadCategoriesWithPaginationQuery, useLoadSubCategoriesWithIdQuery } from "../../../rtk-query/categoriesApiSlice";
import { ICategoryWithSubcategories } from "../../../types/categories";


interface ICategory {
    id: number;
    name: string;
}

const ManageCategories = () => {
  const [value, setValue] = useState("1"); // Tabs value
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] = useState<Record<string, ICategoryWithSubcategories> | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Toggle modals
  const toggleAddCategory = () => {
    setCategoryModal(!categoryModal);
    console.log(categoryModal, "categoryModal");
  };

  const toggleAddSubCategory = () => {
    setSubCategoryModal(!subCategoryModal);
    console.log(subCategoryModal, "subCategoryModal");
  };

  const { data: categories, isLoading: isCategoriesLoading, isError } = useLoadCategoriesWithPaginationQuery({ pageIndex: 0, pageSize: 10 });

  const { data: subCategories, refetch, isLoading: isSubCatLoading } = useLoadSubCategoriesWithIdQuery({
    categoryId: selectedCategory?.id!,
    pageIndex: 0,
    pageSize: 10,
  }, { skip: !selectedCategory }); 

  const [loadAllCategoriesWithSubCategories, { isLoading: isLoadingAllCategories, isFetching }] = useLazyLoadAllCategoriesWithSubCategoriesQuery();

  useEffect(() => {
    void loadAllCategoriesWithSubCategories()?.then((res: any) => {
      const responseBody = res?.data;
      setCategoriesWithSubcategories(responseBody);
    });
  }, []);

  console.log(categoriesWithSubcategories, "keshavvv");

  return (
    <div className="flex flex-col p-4 bg-white m-4 rounded-lg">
      {/* Header */}
      <div className="flex justify-between gap-4 p-4">
        <div className="text-xl font-semibold p-4">Manage Categories</div>
        <div className="flex gap-4 justify-end p-4">
          <Button
            sx={{
              backgroundColor: "#3c82f6",
              color: "white",
              "&:hover": { backgroundColor: "#3c82f6", boxShadow: 4 },
            }}
            onClick={toggleAddCategory}
          >
            Add Categories
          </Button>
          <Button
            sx={{
              backgroundColor: "#3c82f6",
              color: "white",
              "&:hover": { backgroundColor: "#3c82f6", boxShadow: 4 },
            }}
            onClick={toggleAddSubCategory}
          >
            Add SubCategories
          </Button>
        </div>
      </div>

      {/* Tabs for Categories and Subcategories */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Categories" value="1" />
              <Tab label="Sub-Categories" value="2" />
            </TabList>
          </Box>
          
          {/* Categories Table */}
          <TabPanel value="1">
            <CategroiesTable categories={categories} />
          </TabPanel>
          
          {/* SubCategories Table */}
          <TabPanel value="2">
            {/* Conditionally render SubCategoriesTable when data is available */}
            {categoriesWithSubcategories ? (
              <SubCategoriesTable categoriesWithSubcategories={categoriesWithSubcategories} />
            ) : (
              <Typography>Loading subcategories...</Typography>
            )}
          </TabPanel>
        </TabContext>
      </Box>

      {/* Modals */}
      <AddCategoriesModal categoryModal={categoryModal} toggleAddCategory={toggleAddCategory} />
      <AddSubCategoriesModal subCategoryModal={subCategoryModal} toggleAddSubCategory={toggleAddSubCategory} categoriesOptions={categories} />
    </div>
  );
};

export default ManageCategories;
