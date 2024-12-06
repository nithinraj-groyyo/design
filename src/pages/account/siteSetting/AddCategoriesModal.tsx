import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
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

const AddCategoriesModal = ({ categoryModal, toggleAddCategory }: any) => {
    const [categoryName, setCategoryName] = useState("");
  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdateCategory = async () => {
    try {
      const result = await updateCategory({
        name: categoryName,
      }).unwrap();
      console.log("Category updated successfully", result);
      toggleAddCategory();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  return (
    <div>
      <Modal
        open={categoryModal}
        onClose={toggleAddCategory}
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
            Add Category
          </Typography>

          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategoriesModal;
