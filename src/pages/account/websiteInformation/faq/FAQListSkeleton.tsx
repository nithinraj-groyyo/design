import React from 'react';
import { List, Skeleton } from '@mui/material';

const FAQListSkeleton: React.FC = () => {
    return (
        <List>
            {[...Array(5)].map((_, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <Skeleton variant="text" width="80%" height={40} />
                    <Skeleton variant="rectangular" height={100} />
                </div>
            ))}
        </List>
    );
};

export default FAQListSkeleton;
