import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography, Switch, FormControlLabel } from "@mui/material";

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

const CategoriesTable = ({ categories }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setIsActive(category.status === "Active");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  const handleConfirm = () => {
    console.log("Updated Category:", categoryName, isActive ? "Active" : "Inactive");
    handleClose();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Categories</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: any) => (
            <tr key={category.id} className="text-center">
              <td className="py-2 px-4 border-b">{category?.name}</td>
              <td
                className={`py-2 px-4 border-b ${
                  category.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {category.status} Disabled
              </td>
              <td className="py-2 px-4 border-b flex justify-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Edit Category
          </Typography>

          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ marginBottom: 2}}
          />

          <FormControlLabel
            control={<Switch checked={isActive} onChange={handleStatusChange} />}
            label={isActive ? "Active" : "Inactive"}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoriesTable;
