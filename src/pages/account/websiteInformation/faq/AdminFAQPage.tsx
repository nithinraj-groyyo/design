import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FAQForm from './FAQForm';
import FAQList from './FAQList';
import { v4 as uuidv4 } from 'uuid';
import { FAQ } from '../../../../types/faq';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import { initialFAQs } from '../../../../utilities/constants';

const AdminFAQPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editFAQ, setEditFAQ] = useState<FAQ | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

    const handleOpenDialog = (faq: FAQ | null = null) => {
        setEditFAQ(faq);
        setOpenDialog(true);
    };

    const handleAddEditFAQ = (faq: FAQ) => {
        if (faq.id) {
            setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
        } else {
            setFaqs(prev => [...prev, { ...faq, id: uuidv4() }]);
        }
        setOpenDialog(false);
    };

    const handleDeleteFAQ = (faqId: string) => {
        setConfirmDeleteId(faqId);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = () => {
        if (confirmDeleteId) {
            setFaqs(prev => prev.filter(f => f.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        }
        setOpenConfirmDialog(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditFAQ(null);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setConfirmDeleteId(null);
    };

    return (
        <>
            <AccountSettingsLayout>
                <AccountSettingsLayout.Header title='Manage FAQ'>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add New FAQ
                    </Button>
                </AccountSettingsLayout.Header>
                <AccountSettingsLayout.Body>
                    <FAQList faqs={faqs} onEdit={handleOpenDialog} onConfirmDelete={handleDeleteFAQ} />

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>{editFAQ ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
                        <DialogContent>
                            <FAQForm faq={editFAQ} onSubmit={handleAddEditFAQ} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete this FAQ?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseConfirmDialog} color="primary">Cancel</Button>
                            <Button onClick={confirmDelete} color="secondary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </AccountSettingsLayout.Body>
            </AccountSettingsLayout>


        </>
    );
};

export default AdminFAQPage;
