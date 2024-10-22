import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import AccountSettingsLayout from "../../../../layouts/AccountSettingsLayout";
import AdminTeamCard from "./AdminTeamCard";
import { toast } from "react-toastify";
import { Team } from "../../../../types/team";
import JoditEditor from "jodit-react";
import {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useFetchAllTeamMembersQuery,
  useUpdateTeamMemberMutation,
} from "../../../../rtk-query/teamsApiSlice";
import DOMPurify from "dompurify";

const AdminTeamPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editTeamMember, setEditTeamMember] = useState<Team | null>(null);
  const [teamMemberToDelete, setTeamMemberToDelete] = useState<Team | null>(
    null
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const editor = useRef(null);

  // RTK Query Hooks
  const { data: teamMembers, refetch: refetchTeamMembers } =
    useFetchAllTeamMembersQuery();
  const [createTeamMember] = useCreateTeamMemberMutation();
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  const handleContentChange = (newContent: string) => {
    setEditTeamMember((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        description: newContent,
      };
    });
  };

  const config = {
    readonly: false,
  };

  const handleOpenDialog = (teamMember: Team | null = null) => {
    setEditTeamMember(
      teamMember || {
        name: "",
        department: "",
        imageUrl: "",
        isActive: true,
        linkedIn: "",
        role: "",
        description: "",
      }
    );
    setOpenDialog(true);
  };

  const handleAddEditTeamMember = async () => {
    if (!editTeamMember) return;

    try {
      if (editTeamMember.id) {
        const updatedMemberResponse: any = await updateTeamMember({
          id: editTeamMember.id,
          updateData: editTeamMember,
        });
        if (updatedMemberResponse?.statusCode === 200) {
          refetchTeamMembers();
          setOpenDialog(false);
          setEditTeamMember(null);
          toast.success(updatedMemberResponse?.message);
        }
      } else {
        const newMemberResponse: any = await createTeamMember(editTeamMember);
        if (newMemberResponse?.status) {
          refetchTeamMembers();
          setOpenDialog(false);
          setEditTeamMember(null);
          toast.success(newMemberResponse?.message);
        }
      }
    } catch (error) {
      setError("Failed to save team member");
    }
  };

  const handleDeleteTeamMember = async (teamMemberToDelete: Team) => {
    try {
      const response: any = await deleteTeamMember(teamMemberToDelete.id!);
      if (response?.statusCode === 200) {
        refetchTeamMembers();
        handleCloseConfirmDialog();
        toast.success(response?.message);
      }
    } catch (error) {
      setError("Failed to delete team member");
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
        <AccountSettingsLayout.Header title="Manage Team Members">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Add New Team Member
          </Button>
        </AccountSettingsLayout.Header>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {teamMembers?.data?.map((teamMember) => {
            
            return (
              <>
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
              </>
            );
          })}
        </motion.div>
      </AccountSettingsLayout>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editTeamMember?.id ? "Edit Team Member" : "Add Team Member"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Member Name"
            type="text"
            fullWidth
            value={editTeamMember?.name || ""}
            onChange={(e) =>
              setEditTeamMember((prev) => ({ ...prev!, name: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            value={editTeamMember?.role || ""}
            onChange={(e) =>
              setEditTeamMember((prev) => ({ ...prev!, role: e.target.value }))
            }
          />
          <div>
            <div className="">Bio</div>
            <JoditEditor
              ref={editor}
              value={editTeamMember?.description || ""}
              config={config}
              onBlur={handleContentChange}
            />
          </div>
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            value={editTeamMember?.imageUrl || ""}
            onChange={(e) =>
              setEditTeamMember((prev) => ({
                ...prev!,
                imageUrl: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            label="LinkedIn URL"
            type="text"
            fullWidth
            value={editTeamMember?.linkedIn || ""}
            onChange={(e) =>
              setEditTeamMember((prev) => ({
                ...prev!,
                linkedIn: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEditTeamMember} color="primary">
            {editTeamMember?.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the team member "
            {teamMemberToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteTeamMember(teamMemberToDelete!)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminTeamPage;
