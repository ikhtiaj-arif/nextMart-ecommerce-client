import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <main className='min-h-screen mt-[82px]'>

                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;