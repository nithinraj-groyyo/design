import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface SignOutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          width: { xs: "90%", sm: 400, md: 450 },
          outline: "none",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            mb: 2,
            textAlign: "center",
          }}
        >
          Sign Out
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "center",
            mb: 4,
          }}
        >
          Are you sure you want to sign out?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              flex: 1,
              py: 1.5,
              "&:hover": { bgcolor: "primary.dark" },
              fontSize: "0.9rem",
            }}
            onClick={onConfirm}
          >
            Yes, Sign Out
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "text.primary",
              borderColor: "text.secondary",
              flex: 1,
              py: 1.5,
              "&:hover": {
                bgcolor: "action.hover",
              },
              fontSize: "0.9rem",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignOutModal;
