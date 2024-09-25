import React, { PropsWithChildren } from 'react';

interface AccountSettingsLayoutProps {
    children: React.ReactNode;
}

const AccountSettingsLayout: React.FC<PropsWithChildren<AccountSettingsLayoutProps>> & {
    Header: React.FC<PropsWithChildren<{ title: string }>>;
    Body: React.FC<PropsWithChildren>;
} = ({ children }) => {
    return (
        <div className='w-full p-[1.5rem] h-auto '>
            <div className='bg-white w-full h-auto rounded-lg'>
                {children}
            </div>
        </div>
    );
};

AccountSettingsLayout.Header = ({ title, children }) => {
    return (
        <div className="border-b border-gray-300 p-4 flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">{title}</h2>
            {children}
        </div>
    );
};

AccountSettingsLayout.Body = ({ children }) => {
    return (
        <div className="p-4 h-auto">
            {children}
        </div>
    );
};

export default AccountSettingsLayout;
