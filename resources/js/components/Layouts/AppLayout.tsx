import * as React from 'react';
import Header from '../header/Header';

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <Header />
            <main className='container mx-auto py-8 px-4 space-y-5'>
                {children}
            </main>
        </>
    );
}