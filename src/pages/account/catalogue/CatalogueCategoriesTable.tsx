import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useLoadCategoriesWithPaginationQuery } from "../../../rtk-query/categoriesApiSlice";
import { useFetchCategoryListQuery } from "../../../rtk-query/catalogueApiSlice";

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

const CatalogueCategoriesTable = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const token = JSON.parse(localStorage.getItem("authToken") as string);

  const { data: categoriesData } = useFetchCategoryListQuery(token);

  const totalItems = categoriesData?.totalItems ?? 0;
  const pageCount = Math.ceil(totalItems / itemsPerPage); 

  const handleEditClick = (category: any) => {
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); 
  };

  const handleItemsChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0); 
  };

  console.log(categoriesData,"Kesavvv")

  return (
    <div className="overflow-x-auto">
      <TableContainer>
        <Table className="min-w-full bg-white border border-gray-200">
          <TableHead>
            <TableRow >
              <TableCell className="!text-xl !font-semibold">Categories</TableCell>
              <TableCell className="!text-xl !font-semibold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesData?.map((category: any) => (
              <TableRow key={category?.id}>
                <TableCell>{category?.name}</TableCell>
                <TableCell>
                  <Button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditClick(category)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
        <FormControl>
          <Select value={itemsPerPage} onChange={handleItemsChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Edit Category</Typography>
          <TextField
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ marginBottom: 2 }}
            className="!mt-8"
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

export default CatalogueCategoriesTable;
