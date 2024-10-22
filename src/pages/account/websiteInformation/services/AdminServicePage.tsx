import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, DialogContentText, Skeleton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import AdminServiceCard from './AdminServiceCard';
import { Service } from '../../../../types/service';
import { toast } from 'react-toastify';
import { useCreateServiceMutation, useDeleteServiceMutation, useFetchAllServicesQuery, useUpdateServiceMutation } from '../../../../rtk-query/serviceApiSlice';
import JoditEditor from "jodit-react";

const AdminServicePage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editService, setEditService] = useState<Service | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    
    const descriptionKeyRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { data: services = [], isLoading, isError, refetch } = useFetchAllServicesQuery();
    const [createService, {isLoading: isCreationLoading}] = useCreateServiceMutation();
    const [updateService, {isLoading: isUpdationLoading}] = useUpdateServiceMutation();
    const [deleteService, {isLoading: isDeletionLoading}] = useDeleteServiceMutation();

    const editor = useRef(null);

    const handleContentChange = (newContent: string) => {
      setEditService(prev => ({ ...prev!, description: newContent }))
    };

    const config = {
      readonly: false,
    };

    const handleOpenDialog = (service: Service | null = null) => {
        setEditService(service || {
            title: '',
            description: '',
            buttonLabel: '',
            imagePath: '',
            buttonUrl: '',
            featuresList: [] 
        });
        setOpenDialog(true);
    };

    const handleAddEditService = async () => {
        if (!editService) return;

        try {
            if (editService.id) {
                const updatedServiceResponse: any = await updateService({ id: editService.id, serviceData: editService });
                if (!updatedServiceResponse?.error) {
                    refetch();
                    setOpenDialog(false);
                    setEditService(null);
                    toast.success('Service updated successfully!');
                } else {
                    toast.error('Failed to update service');
                }
            } else {
                const newServiceResponse: any = await createService(editService);
                if (!newServiceResponse?.error) {
                    refetch();
                    setOpenDialog(false);
                    setEditService(null);
                    toast.success('Service created successfully!');
                } else {
                    toast.error('Failed to create service');
                }
            }            
        } catch (error) {
            toast.error('Failed to save service');
        }
    };

    const handleDeleteService = async (serviceToDelete: Service) => {
        try {
            const response = await deleteService(serviceToDelete.id!);
            if (!response?.error) {
                refetch();
                handleCloseConfirmDialog();
                toast.success('Service deleted successfully!');
            } else {
                toast.error('Failed to delete service');
            }
        } catch (error) {
            toast.error('Failed to delete service');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditService(null);
    };

    const handleAddDescriptionKey = () => {
        setEditService((prev) => ({
            ...prev!,
            featuresList: [...(prev?.featuresList || []), { featureName: '', featureDetail: '' }] 
        }));
    };

    const handleRemoveDescriptionKey = (index: number) => {
        setEditService((prev) => ({
            ...prev!,
            featuresList: prev?.featuresList?.filter((_, i) => i !== index) || [], 
        }));
    };

    const handleUpdateDescriptionKey = (index: number, field: 'featureName' | 'featureDetail', value: string) => {
        setEditService((prev) => ({
            ...prev!,
            featuresList: prev?.featuresList?.map((desc, i) =>
                i === index ? { ...desc, [field]: value } : desc
            ) || [],
        }));
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setServiceToDelete(null);
    };

    useEffect(() => {
        if (editService?.featuresList) {
            const lastIndex = editService?.featuresList?.length - 1;
            if (descriptionKeyRefs.current[lastIndex]) {
                descriptionKeyRefs.current[lastIndex]?.focus();
            }
        }
    }, [editService?.featuresList]);

    return (
        <>
            <AccountSettingsLayout>
                <AccountSettingsLayout.Header title='Manage Services'>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add New Service
                    </Button>
                </AccountSettingsLayout.Header>

                <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
                    {isLoading ? (
                        Array.from(new Array(3)).map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
                                <Skeleton variant="text" width="80%" height={100} animation="wave" />
                                <Skeleton variant="text" width="60%" height={20} animation="wave" />
                                <Skeleton variant="text" width="90%" height={20} animation="wave" />
                            </motion.div>
                        ))
                    ) : (
                        services?.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            >
                                <AdminServiceCard
                                    service={service}
                                    onEdit={handleOpenDialog}
                                    onDelete={(service) => {
                                        setServiceToDelete(service);
                                        setOpenConfirmDialog(true);
                                    }}
                                />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </AccountSettingsLayout>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editService?.title ? 'Edit Service' : 'Add Service'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Service Title"
                        type="text"
                        fullWidth
                        value={editService?.title || ''}
                        onChange={(e) => setEditService(prev => ({ ...prev!, title: e.target.value }))}
                    />
                    {/* <TextField
                        margin="dense"
                        label="Service Description"
                        type="text"
                        fullWidth
                        value={editService?.description || ''}
                        onChange={(e) => setEditService(prev => ({ ...prev!, description: e.target.value }))}
                    /> */}
                    <div>
                      <div className="">Bio</div>
                      <JoditEditor
                        ref={editor}
                        value={editService?.description || ''}
                        config={config}
                        // tabIndex={1}
                        onBlur={handleContentChange}
                      />
                    </div>
                    {editService?.featuresList?.map((desc, index) => (
                        <div key={index} className="flex items-center gap-4 mt-4">
                            <TextField
                                inputRef={(ref) => descriptionKeyRefs.current[index] = ref}
                                label={`Feature Name ${index + 1}`}
                                type="text"
                                fullWidth
                                value={desc.featureName}
                                onChange={(e) => handleUpdateDescriptionKey(index, 'featureName', e.target.value)}
                            />
                            <TextField
                                label={`Feature Detail ${index + 1}`}
                                type="text"
                                fullWidth
                                value={desc.featureDetail}
                                onChange={(e) => handleUpdateDescriptionKey(index, 'featureDetail', e.target.value)}
                            />
                            <IconButton onClick={() => handleRemoveDescriptionKey(index)} color="secondary">
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddDescriptionKey}
                            className="!my-4"
                        >
                            Add New Description List
                            <AddIcon className="ml-2" />
                        </Button>
                        <TextField
                            margin="dense"
                            label="Button Name"
                            type="text"
                            fullWidth
                            value={editService?.buttonLabel || ''}
                            onChange={(e) => setEditService(prev => ({ ...prev!, buttonLabel: e.target.value }))}
                        />
                        <TextField
                            margin="dense"
                            label="Image URL"
                            type="text"
                            fullWidth
                            value={editService?.imagePath || ''}
                            onChange={(e) => setEditService(prev => ({ ...prev!, imagePath: e.target.value }))}
                        />
                        <TextField
                            margin="dense"
                            label="Button Redirection URL"
                            type="text"
                            fullWidth
                            value={editService?.buttonUrl || ''}
                            onChange={(e) => setEditService(prev => ({ ...prev!, buttonUrl: e.target.value }))}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddEditService} color="primary">
                            {(isUpdationLoading || isCreationLoading) ? <CircularProgress size={20} /> : editService?.id ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the service "{serviceToDelete?.title}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleDeleteService(serviceToDelete!)} color="secondary">
                            {isDeletionLoading ? <CircularProgress size={20} />: 'Delete'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };
    
    export default AdminServicePage;