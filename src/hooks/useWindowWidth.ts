import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobileView = windowWidth <= 768;

    return { windowWidth, isMobileView };
};

export default useWindowWidth;