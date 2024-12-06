import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAddCatalogueCategoryMutation } from "../../../rtk-query/catalogueApiSlice";

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

const AddCatalogueCategoriesModal = ({ categoryModal, toggleAddCategory }: any) => {
    const [categoryName, setCategoryName] = useState("");
    const [noOfFreePages, setNoOfFreePages] = useState(0);
    const [updateCategory] = useAddCatalogueCategoryMutation();
    const token = JSON.parse(localStorage.getItem("authToken") || 'null');

    const handleUpdateCatalogue = async () => {
        try {
            const result = await updateCategory({
                name: categoryName,
                token,
                numberOfFreeCatalogues: 10
            }).unwrap();
            toggleAddCategory();
            console.log("Category updated successfully", result);
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
                        Add Catalogue
                    </Typography>

                    <TextField
                        label="Catalogue Name"
                        variant="outlined"
                        fullWidth
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />

                    <TextField
                        label="Number of Free Pages"
                        variant="outlined"
                        fullWidth
                        value={noOfFreePages}
                        onChange={(e) => setNoOfFreePages(+e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button variant="contained" color="primary" onClick={handleUpdateCatalogue}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCatalogueCategoriesModal;
