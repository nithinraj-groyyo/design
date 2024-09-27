import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import AdminServiceCard from './AdminServiceCard';
import { Service } from '../../../../types/service';
import { createService, deleteService, fetchAllServices, updateService } from '../../../../api/servicesApi';
import { toast } from 'react-toastify';
import { ResponseFormat } from '../../../../types/responseFormat';

const AdminServicePage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editService, setEditService] = useState<Service | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const descriptionKeyRefs = useRef<(HTMLInputElement | null)[]>([]);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data: any = await fetchAllServices();
            setServices(data?.data);
        } catch (error) {
            setError('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

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
                const updatedServiceResponse: any= await updateService(editService.id, editService);
               if(updatedServiceResponse?.statusCode === 200){
                    loadServices()
                    setOpenDialog(false);
                    setEditService(null);
                    toast.success(updatedServiceResponse?.message)
               }
            } else {
                const newServiceResponse: any = await createService(editService);
                if(newServiceResponse?.statusCode === 200){
                    loadServices()
                    setOpenDialog(false);
                    setEditService(null);
                    toast.success(newServiceResponse?.message)
               }
            }            
        } catch (error) {
            setError('Failed to save service');
        }
    };

    const handleDeleteService = async (serviceToDelete: Service) => {
        try {
            const response = await deleteService(serviceToDelete.id!);
            if(response?.statusCode === 200){
                loadServices()
                handleCloseConfirmDialog();
                toast.success(response?.message)
            }
        } catch (error) {
            setError('Failed to delete service');
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
                    {services?.map((service, index) => (
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
                    ))}
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
                    <TextField
                        margin="dense"
                        label="Service Description"
                        type="text"
                        fullWidth
                        value={editService?.description || ''}
                        onChange={(e) => setEditService(prev => ({ ...prev!, description: e.target.value }))}
                    />
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
                        {editService?.title ? 'Update' : 'Add'}
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
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminServicePage;