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
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadFaqs = async () => {
            try {
                const loadedFaqs = await fetchFaqs();
                setFaqs(loadedFaqs);
            } catch (error) {
                toast.error('Failed to load FAQs.');
            } finally {
                setLoading(false);
            }
        };
        loadFaqs();
    }, []);

    const handleOpenDialog = (faq: FAQ | null = null) => {
        setEditFAQ(faq);
        setOpenDialog(true);
    };

    const handleAddEditFAQ = async (faq: Partial<FAQ>) => {
        //... (same as before)
    };

    const handleDeleteFAQ = (faqId: string | number) => {
        //... (same as before)
    };

    const confirmDelete = async () => {
        //... (same as before)
    };

    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='Manage FAQ'>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                    Add New FAQ
                </Button>
            </AccountSettingsLayout.Header>
            <AccountSettingsLayout.Body>
                {loading ? (
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
