import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">Confirm to Remove</h3>
                <p className="mt-2 text-sm">Are you sure you want to remove this item from the cart?</p>
                <div className="flex justify-around gap-4 mt-4">
                    <button 
                        className="px-4 py-2 bg-[#A2865B] text-white cursor-pointer rounded-lg text-xl font-bold flex-1" 
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button 
                        className="px-4 py-2 bg-[#D7B889] text-white cursor-pointer rounded-lg text-xl font-bold flex-1" 
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;