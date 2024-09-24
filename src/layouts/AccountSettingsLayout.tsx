import React, { PropsWithChildren } from 'react';

const AccountSettingsLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='w-full p-[1.5rem]'>
            <div className='bg-white w-full rounded-lg'>
                {children}
            </div>
        </div>
    );
};

export default AccountSettingsLayout;
