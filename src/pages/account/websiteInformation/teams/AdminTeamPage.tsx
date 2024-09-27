import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';
import AdminTeamCard from './AdminTeamCard';
import { toast } from 'react-toastify';
import { Team } from '../../../../types/team';
import { createTeamMember, deleteTeamMember, fetchAllTeamMembers, updateTeamMember } from '../../../../api/teamsApi';

const AdminTeamPage: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<Team[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editTeamMember, setEditTeamMember] = useState<Team | null>(null);
    const [teamMemberToDelete, setTeamMemberToDelete] = useState<Team | null>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadTeamMembers = async () => {
        setLoading(true);
        try {
            const data: any = await fetchAllTeamMembers();
            console.log(data)
            setTeamMembers(data?.data);
        } catch (error) {
            setError('Failed to fetch team members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeamMembers();
    }, []);
    
    const handleOpenDialog = (teamMember: Team | null = null) => {
        setEditTeamMember(teamMember || {
            name: '',
            department: "",
            imageUrl: "",
            isActive: true,
            linkedIn:"",
            role: "",
            description:"",
        });
        setOpenDialog(true);
    };

    const handleAddEditTeamMember = async () => {
        if (!editTeamMember) return;

        try {
            if (editTeamMember.id) {
                const updatedMemberResponse: any = await updateTeamMember(editTeamMember.id, editTeamMember);
                if (updatedMemberResponse?.statusCode === 200) {
                    loadTeamMembers();
                    setOpenDialog(false);
                    setEditTeamMember(null);
                    toast.success(updatedMemberResponse?.message);
                }
            } else {
                const newMemberResponse: any = await createTeamMember(editTeamMember);
                if (newMemberResponse?.statusCode === 201) {
                    loadTeamMembers();
                    setOpenDialog(false);
                    setEditTeamMember(null);
                    toast.success(newMemberResponse?.message);
                }
            }
        } catch (error) {
            setError('Failed to save team member');
        }
    };

    const handleDeleteTeamMember = async (teamMemberToDelete: Team) => {
        try {
            const response = await deleteTeamMember(teamMemberToDelete.id!);
            if (response?.statusCode === 200) {
                loadTeamMembers();
                handleCloseConfirmDialog();
                toast.success(response?.message);
            }
        } catch (error) {
            setError('Failed to delete team member');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditTeamMember(null);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setTeamMemberToDelete(null);
    };

    return (
        <>
            <AccountSettingsLayout>
                <AccountSettingsLayout.Header title='Manage Team Members'>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add New Team Member
                    </Button>
                </AccountSettingsLayout.Header>

                <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
                    {teamMembers?.map((teamMember) => (
                        <motion.div
                            key={teamMember.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                        >
                            <AdminTeamCard
                                teamMember={teamMember}
                                onEdit={handleOpenDialog}
                                onDelete={(teamMember) => {
                                    setTeamMemberToDelete(teamMember);
                                    setOpenConfirmDialog(true);
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AccountSettingsLayout>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editTeamMember?.name ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Team Member Name"
                        type="text"
                        fullWidth
                        value={editTeamMember?.name || ''}
                        onChange={(e) => setEditTeamMember(prev => ({ ...prev!, name: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        label="Position"
                        type="text"
                        fullWidth
                        value={editTeamMember?.role || ''}
                        onChange={(e) => setEditTeamMember(prev => ({ ...prev!, role: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        label="Bio"
                        type="text"
                        fullWidth
                        value={editTeamMember?.description || ''}
                        onChange={(e) => setEditTeamMember(prev => ({ ...prev!, description: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        type="text"
                        fullWidth
                        value={editTeamMember?.imageUrl || ''}
                        onChange={(e) => setEditTeamMember(prev => ({ ...prev!, imageUrl: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        label="LinkedIn URL"
                        type="text"
                        fullWidth
                        value={editTeamMember?.linkedIn || ''}
                        onChange={(e) => setEditTeamMember(prev => ({ ...prev!, linkedIn: e.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEditTeamMember} color="primary">
                        {editTeamMember?.name ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the team member "{teamMemberToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteTeamMember(teamMemberToDelete!)} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminTeamPage;