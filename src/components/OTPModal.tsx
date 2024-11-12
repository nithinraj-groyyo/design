// components/OtpModal.tsx
import React, { useState } from 'react';
import { Modal, Button, CircularProgress, TextField } from '@mui/material';

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  isLoading?: boolean;
}

const OtpModal: React.FC<OtpModalProps> = ({ open, onClose, onSubmit, isLoading }) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    onSubmit(otp);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
          <TextField
            id="otp"
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={handleOtpChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleVerifyOtp}
            disabled={isLoading || !otp}
          >
            {isLoading ? <CircularProgress size={24} /> : "Verify OTP"}
          </Button>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OtpModal;
