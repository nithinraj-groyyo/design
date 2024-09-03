import React, { PropsWithChildren } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import useWindowWidth from '../hooks/useWindowWidth';
import { useLocation } from 'react-router-dom';
import Authheaders from '../components/header/Authheaders';
import MobileHeader from '../components/header/MobileHeader';

interface BasicLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

const BasicLayout: React.FC<PropsWithChildren<BasicLayoutProps>> = ({ showHeader = true, showFooter = true, children }) => {
  const {isMobileView} = useWindowWidth();
  const location = useLocation();
  
  return (
    <div className='flex flex-col min-h-[100vh]'>
      {showHeader && isMobileView ? ((location?.pathname === "/login" || location?.pathname === "/signup") ? <Authheaders /> : <MobileHeader />): <Header /> }
      <main className='flex-1'>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default BasicLayout;