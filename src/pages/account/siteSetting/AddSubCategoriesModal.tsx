import { Box, Button, Modal, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import { useLoadCategoriesWithPaginationQuery } from "../../../rtk-query/categoriesApiSlice";
import { useUpdateCategoryMutation } from "../../../rtk-query/categoriesApiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddSubCategoriesModal = ({ subCategoryModal, toggleAddSubCategory, categoriesOptions }: any) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | string>('');  // Ensure it's a number or string

  const { data: categoriesData, isLoading: isCategoriesLoading, isError } = useLoadCategoriesWithPaginationQuery({
    pageIndex: 0,
    pageSize: 999,
  });

  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdateCategory = async () => {
    try {
      const categoryId = Number(selectedCategory);
      if (!categoryId) {
        throw new Error("Category is not selected.");
      }

      const result = await updateCategory({
        name: subcategoryName,
        parentId: categoryId,  
      }).unwrap();

      console.log("Category updated successfully", result);
      toggleAddSubCategory();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  return (
    <Modal
      open={subCategoryModal}
      onClose={toggleAddSubCategory}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Add Subcategory
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }} className="!mt-8">
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Select Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoriesData?.map((category: any) => (
              <MenuItem key={category?.id} value={category?.id}>  {/* Store category id here */}
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Subcategory Name"
          variant="outlined"
          fullWidth
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateCategory}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSubCategoriesModal;
