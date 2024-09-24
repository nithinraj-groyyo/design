import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import AdminServiceCard from './AdminServiceCard';
import { Service } from '../../../../types/service';
import { initialServices } from '../../../../utilities/constants';

const AdminServicePage: React.FC = () => {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editService, setEditService] = useState<Service | null>(null);
    
    
    const descriptionKeyRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOpenDialog = (service: Service | null = null) => {
        setEditService(service || {
            title: '',
            description: '',
            buttonName: '',
            imageUrl: '',
            buttonRedirectionUrl: '',
            descriptionListKeys: []
        });
        setOpenDialog(true);
    };

    const handleAddEditService = () => {
        if (!editService) return;

        if (editService.title) {
            if (services.some(service => service.title === editService.title)) {
                setServices((prev) =>
                    prev.map((service) => service.title === editService.title ? editService : service)
                );
            } else {
                setServices((prev) => [...prev, editService]);
            }
        }

        setOpenDialog(false);
        setEditService(null);
    };

    const handleDeleteService = (serviceToDelete: Service) => {
        setServices((prev) => prev.filter((service) => service.title !== serviceToDelete.title));
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditService(null);
    };

    const handleAddDescriptionKey = () => {
        setEditService((prev) => ({
            ...prev!,
            descriptionListKeys: [...(prev?.descriptionListKeys || []), { key: '', detail: '' }],
        }));
    };

    const handleRemoveDescriptionKey = (index: number) => {
        setEditService((prev) => ({
            ...prev!,
            descriptionListKeys: prev?.descriptionListKeys.filter((_, i) => i !== index) || [],
        }));
    };

    const handleUpdateDescriptionKey = (index: number, field: 'key' | 'detail', value: string) => {
        setEditService((prev) => ({
            ...prev!,
            descriptionListKeys: prev?.descriptionListKeys.map((desc, i) =>
                i === index ? { ...desc, [field]: value } : desc
            ) || [],
        }));
    };

    useEffect(() => {
        if (editService?.descriptionListKeys) {
            const lastIndex = editService.descriptionListKeys.length - 1;
            if (descriptionKeyRefs.current[lastIndex]) {
                descriptionKeyRefs.current[lastIndex]?.focus();
            }
        }
    }, [editService?.descriptionListKeys]);

    return (
        <>
            <AccountSettingsLayout>
                <AccountSettingsLayout.Header title='Manage Services'>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add New Service
                    </Button>
                </AccountSettingsLayout.Header>

                <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
                    {services.map((service, index) => (
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
                                onDelete={handleDeleteService}
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
                    {editService?.descriptionListKeys?.map((desc, index) => (
                        <div key={index} className="flex items-center gap-4 mt-4">
                            <TextField
                                inputRef={(ref) => descriptionKeyRefs.current[index] = ref} 
                                label={`Key ${index + 1}`}
                                type="text"
                                fullWidth
                                value={desc.key}
                                onChange={(e) => handleUpdateDescriptionKey(index, 'key', e.target.value)}
                            />
                            <TextField
                                label={`Detail ${index + 1}`}
                                type="text"
                                fullWidth
                                value={desc.detail}
                                onChange={(e) => handleUpdateDescriptionKey(index, 'detail', e.target.value)}
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
                        value={editService?.buttonName || ''}
                        onChange={(e) => setEditService(prev => ({ ...prev!, buttonName: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        type="text"
                        fullWidth
                        value={editService?.imageUrl || ''}
                        onChange={(e) => setEditService(prev => ({ ...prev!, imageUrl: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        label="Button Redirection URL"
                        type="text"
                        fullWidth
                        value={editService?.buttonRedirectionUrl || ''}
                        onChange={(e) => setEditService(prev => ({ ...prev!, buttonRedirectionUrl: e.target.value }))}
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
        </>
    );
};

export default AdminServicePage;
