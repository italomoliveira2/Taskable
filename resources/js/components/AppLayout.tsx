import * as React from 'react';
import Header from "./header/Header";

interface AppLayoutProps {
     children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <Header />
            <main className='py-2 px-4'>
                {children}
            </main>
        </>
    );
}