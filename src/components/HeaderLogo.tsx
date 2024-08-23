import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo: React.FC = () => (
    <Link to="/" className="flex items-center">
        <img
            src="/images/landingPages/logo-2.png"
            alt="Company logo"
            className="h-16 w-16 mx-6"
        />
    </Link>
);

export default HeaderLogo;