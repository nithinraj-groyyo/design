import React, { useEffect, useState } from "react";
import {
  Box,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  Modal,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import { useLazyLoadAllCategoriesWithSubCategoriesQuery } from "../../../rtk-query/categoriesApiSlice";
import { ICategoryWithSubcategories } from "../../../types/categories";
import { useLazyLoadCatalogueCategoryAndSubCategoriesQuery } from "../../../rtk-query/catalogueApiSlice";

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

const CatalogueSubCategoriesTable = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState<Record<string, ICategoryWithSubcategories> | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [loadAllCategoriesWithSubCategories, { isLoading, isFetching }] =
  useLazyLoadCatalogueCategoryAndSubCategoriesQuery();
  const token = JSON.parse(localStorage.getItem("authToken") || 'null');

  useEffect(() => {
    void loadAllCategoriesWithSubCategories(token)?.then((res: any) => {
      const responseBody = res?.data;
      setCategoriesWithSubcategories(responseBody);
    });
  }, []);

  const flattenedSubCategories = categoriesWithSubcategories
    ? Object.keys(categoriesWithSubcategories).flatMap((categoryKey) => {
        const category = categoriesWithSubcategories[categoryKey];
        return category.subcategories.map((subcategory: any) => ({
          subCategory: subcategory?.name,
          category: categoryKey,
          status: "Active",
          id: subcategory.id,
        }));
      })
    : [];

  const handleEditClick = (subCategory: any) => {
    console.log(subCategory, "verma");
    setSubCategoryName(subCategory?.subCategory);
    setIsActive(subCategory?.status === "Active");
    setOpen(true);
  };

  const totalItems = flattenedSubCategories.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const paginatedSubCategories = flattenedSubCategories.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value); 
  };

  const handleItemsChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  const handleClose = () => setOpen(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  const handleConfirm = () => {
    console.log(
      "Updated Sub Category:",
      subCategoryName,
      isActive ? "Active" : "Inactive"
    );
    handleClose();
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white border border-gray-200">
        <TableHead>
          <TableRow>
            <TableCell className="py-2 px-4 border-b">Sub Category</TableCell>
            <TableCell className="py-2 px-4 border-b">Category</TableCell>
            {/* <TableCell className="py-2 px-4 border-b">Status</TableCell> */}
            <TableCell className="py-2 px-4 border-b">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedSubCategories.map((item: any) => (
            <TableRow key={item.id} className="text-center">
              <TableCell className="py-2 px-4 border-b">{item.subCategory}</TableCell>
              <TableCell className="py-2 px-4 border-b">{item.category}</TableCell>
              {/* <TableCell
                className={`py-2 px-4 border-b ${
                  item.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.status}
              </TableCell> */}
              <TableCell className="py-2 px-4 border-b flex justify-center">
                <Button
                  onClick={() => handleEditClick(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
          <Typography variant="h6">Edit Sub Category</Typography>
          <TextField
            label="Sub Category Name"
            fullWidth
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
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

export default CatalogueSubCategoriesTable;
