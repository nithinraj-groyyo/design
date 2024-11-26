import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLoadSubCategoriesWithIdQuery } from "../../../rtk-query/categoriesApiSlice";
import SubCategoriesTable from "../siteSetting/SubCategoriesTable";
import AddCatalogueCategoriesModal from "./AddCatalogueCategoriesModal";
import AddCatalogueSubCategoriesModal from "./AddCatalogueSubCategoriesModal";
import CategoriesTable from "../siteSetting/CategroiesTable";
import CatalogueCategoriesTable from "./CatalogueCategoriesTable";
import CatalogueSubCategoriesTable from "./CatalogueSubCategoriesTable";


interface ICategory {
    id: number;
    name: string;
  }

const ManageCatalogueCategories = () => {
  const [value, setValue] = React.useState("1");
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const toggleAddCategory = () => {
    setCategoryModal(!categoryModal);
    console.log(categoryModal, "categoryModal");
  };

  const toggleAddSubCategory = () => {
    setSubCategoryModal(!subCategoryModal);
    console.log(subCategoryModal, "subCategoryModal");
  };

  const {
    data: subCategories,
    refetch,
    isLoading: isSubCatLoading,
  } = useLoadSubCategoriesWithIdQuery({
    categoryId: selectedCategory?.id!,
    pageIndex: 0,
    pageSize: 10,
  });
  

  return (
    <div className="flex flex-col p-4 bg-white m-4 rounded-lg">
      <div className="flex justify-between gap-4 p-4">
        <div className="text-xl font-semibold p-4">Manage Categories</div>
        <div className="flex gap-4 justify-end p-4">
            <Button
            sx={{
                backgroundColor: "#3c82f6",
                color: "white",
                "&:hover": { backgroundColor: "#3c82f6", boxShadow:4 },
            }}
            onClick={toggleAddCategory}
            >
            Add Categories
            </Button>
            <Button
            sx={{
                backgroundColor: "#3c82f6",
                color: "white",
                "&:hover": { backgroundColor: "#3c82f6", boxShadow:4 },
            }}
            onClick={toggleAddSubCategory}
            >
            Add SubCategories
            </Button>
        </div>
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Categories" value="1" />
              <Tab label="Sub-Categories" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CatalogueCategoriesTable />
          </TabPanel>
          <TabPanel value="2">
            <CatalogueSubCategoriesTable />
          </TabPanel>
        </TabContext>
      </Box>

    <AddCatalogueCategoriesModal categoryModal={categoryModal} toggleAddCategory={toggleAddCategory}/>
    <AddCatalogueSubCategoriesModal subCategoryModal={subCategoryModal} toggleAddSubCategory= {toggleAddSubCategory} />
    </div>
  );
};

export default ManageCatalogueCategories;
