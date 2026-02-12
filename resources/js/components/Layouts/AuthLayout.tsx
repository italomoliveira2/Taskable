import * as React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <main className="flex items-center justify-between min-h-screen *:min-h-screen">
                {children}
            </main>
        </>
    );
}