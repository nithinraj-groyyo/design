import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FAQForm from './FAQForm';
import FAQList from './FAQList';
import { FAQ } from '../../../../types/faq';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import { toast } from 'react-toastify';
import FAQListSkeleton from './FAQListSkeleton';
import { useFetchFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } from '../../../../rtk-query/faqApiSlice';

const AdminFAQPage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editFAQ, setEditFAQ] = useState<FAQ | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);


    const { data: faqs = [], isLoading: faqsLoading } = useFetchFaqsQuery();
    const [createFaq] = useCreateFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();

    const handleOpenDialog = (faq: FAQ | null = null) => {
        setEditFAQ(faq);
        setOpenDialog(true);
    };

    const handleAddEditFAQ = async (faq: Partial<FAQ>) => {
        try {
            let response;

            if (faq?.id) {
            
                response = await updateFaq({ id: faq.id as number, faq });
                toast.success('FAQ updated successfully!');
            } else {
            
                response = await createFaq(faq);
                toast.success('FAQ added successfully!');
            }

            if (response?.error) {
                toast.error('An unexpected error occurred while processing your request.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred while processing your request.');
        } finally {
            setOpenDialog(false);
        }
    };

    const handleDeleteFAQ = (faqId: string | number) => {
        setConfirmDeleteId(faqId);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (confirmDeleteId) {
            try {
                const response = await deleteFaq(confirmDeleteId as number);
                if (!response?.error) {
                    toast.success('FAQ deleted successfully!');
                } else {
                    toast.error('Failed to delete FAQ.');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the FAQ.');
            }
        }
        setConfirmDeleteId(null);
        setOpenConfirmDialog(false);
    };

    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='Manage FAQ'>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                    Add New FAQ
                </Button>
            </AccountSettingsLayout.Header>
            <AccountSettingsLayout.Body>
                {faqsLoading ? (
                    <FAQListSkeleton />
                ) : (
                    <FAQList faqs={faqs} onEdit={handleOpenDialog} onConfirmDelete={handleDeleteFAQ} />
                )}

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>{editFAQ ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
                    <DialogContent>
                        <FAQForm faq={editFAQ} onSubmit={handleAddEditFAQ} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this FAQ?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenConfirmDialog(false)} color="primary">Cancel</Button>
                        <Button onClick={confirmDelete} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </AccountSettingsLayout.Body>
        </AccountSettingsLayout>
    );
};

export default AdminFAQPage;
