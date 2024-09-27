import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FAQForm from './FAQForm';
import FAQList from './FAQList';
import { FAQ } from '../../../../types/faq';
import { fetchFaqs, createFaq, deleteFaq, updateFaq } from '../../../../api/faqApi';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import { toast } from 'react-toastify';
import { ResponseFormat } from '../../../../types/responseFormat';
import { ApiError } from '../../../../api';
import FAQListSkeleton from './FAQListSkeleton';

const AdminFAQPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editFAQ, setEditFAQ] = useState<FAQ | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [faqsLoading, setfaqsLoading] = useState(false);

    const loadFaqs = async () => {
        setfaqsLoading(true)
        const loadedFaqs = await fetchFaqs();
        setFaqs(loadedFaqs);
        setfaqsLoading(false)
    };

    useEffect(() => {
        loadFaqs();
    }, []);

    const handleOpenDialog = (faq: FAQ | null = null) => {
        setEditFAQ(faq);
        setOpenDialog(true);
    };

    const handleAddEditFAQ = async (faq: Partial<FAQ>) => {
        try {
            let response: ResponseFormat<FAQ> | undefined;

            if (faq?.id) {
                response = await updateFaq(faq?.id as number, faq);

            } else {
                response = await createFaq(faq);
            }

            if (response?.statusCode === 200 || response?.statusCode === 201) {
                
                if (faq?.id) {
                    toast.success('FAQ updated successfully!');
                }
                toast.success('FAQ added successfully!');
                loadFaqs()
            } else {
                toast.error('An unexpected error occurred while processing your request.');
            }
        } catch (error) {
            if (error instanceof ApiError) {
                console.error(`Error ${error.statusCode}: ${error.message}`);
            } else {
                toast.error('An unexpected error occurred while processing your request.');
            }
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
                const response: ResponseFormat<void> = await deleteFaq(confirmDeleteId as number);
                if (response?.statusCode === 200) {
                    toast.success(response?.message || 'FAQ deleted successfully!');
                    loadFaqs()
                } else {
                    toast.error(response?.message || 'Failed to delete FAQ?.');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the FAQ?.');
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
