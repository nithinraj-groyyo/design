import { Box, Button, Modal, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import { useFetchCategoryListQuery, useAddCatalogueSubCategoryMutation } from "../../../rtk-query/catalogueApiSlice";

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

const AddCatalogueSubCategoriesModal = ({ subCategoryModal, toggleAddSubCategory }: any) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addCatalogueSubCategory, { isLoading }] = useAddCatalogueSubCategoryMutation();

  const token = JSON.parse(localStorage.getItem("authToken") || 'null');
  const { data: categoriesData } = useFetchCategoryListQuery(token);

  const handleAddSubCategory = async () => {
    if (!subcategoryName || !selectedCategory) {
      console.error("Both subcategory name and category must be selected");
      return;
    }

    try {
      const response = await addCatalogueSubCategory({
        name: subcategoryName,
        parentId: +selectedCategory,
        token,
      }).unwrap();
      console.log("Subcategory added successfully:", response);
      toggleAddSubCategory();
    } catch (error) {
      console.error("Error adding subcategory:", error);
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
              <MenuItem key={category?.id} value={category?.id}>
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
            onClick={handleAddSubCategory}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Confirm"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCatalogueSubCategoriesModal;
