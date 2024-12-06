// components/OtpModal.tsx
import React, { useState } from 'react';
import { Modal, CircularProgress, TextField } from '@mui/material';

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
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
          <TextField
            autoFocus
            id="otp"
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={handleOtpChange}
          />
          <button
            onClick={handleVerifyOtp}
            disabled={isLoading || !otp}
            className={`w-full px-4 py-2 text-white bg-black rounded-lg ${
              isLoading || !otp
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-800 transition-all duration-300'
            }`}
          >
            {isLoading ? <CircularProgress size={24} className="text-white" /> : 'Verify OTP'}
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-black border !border-black !bg-white rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OtpModal;
