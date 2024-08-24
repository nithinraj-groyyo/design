import React from 'react';
import { Button } from '@mui/material';

const AddToBagButton = () => {
    const handleAddToBag = () => {
        console.log('Item added to bag');
    };

    return (
        <Button variant='outlined' onClick={handleAddToBag} className='border !border-[#111010] w-full !text-[#111010]' >
            Add to Bag
        </Button>
    );
};

export default AddToBagButton;