import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface SignOutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white rounded-lg shadow-lg
          w-[90%] xs:w-[400px] md:w-[450px]
          p-3 xs:p-4
        "
      >
        <Typography
          variant="h6"
          component="h2"
          className="text-lg sm:text-xl font-bold text-gray-800"
        >
          Sign Out
        </Typography>
        <Typography className="mt-2 text-sm sm:text-base text-gray-600">
          Are you sure you want to sign out?
        </Typography>
        <Box className="flex justify-between mt-6">
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600 text-white hover:bg-blue-500 px-4 sm:px-6 py-2 rounded-lg"
            onClick={onConfirm}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="border-gray-400 text-gray-600 hover:bg-gray-100 px-4 sm:px-6 py-2 rounded-lg"
            onClick={onClose}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignOutModal;