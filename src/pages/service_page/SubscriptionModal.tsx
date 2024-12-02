import React from 'react';
import { Modal } from '@mui/material';

const SubscriptionModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white rounded-lg p-6 shadow-lg w-fit ">
        <div className='w-full'>
            {children}
        </div>
    
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
