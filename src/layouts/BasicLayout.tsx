import React, { PropsWithChildren } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

interface BasicLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

const BasicLayout: React.FC<PropsWithChildren<BasicLayoutProps>> = ({ showHeader = true, showFooter = true, children }) => {
  return (
    <div className='flex flex-col min-h-[100vh]'>
      {showHeader && <Header />}
      <main className='flex-1'>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default BasicLayout;