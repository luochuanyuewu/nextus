import React from 'react';

interface PageContainerProps {
    className?:string;
    children?: React.ReactNode
}

export default function PageContainer({children}: PageContainerProps) {
    return (
        <div className="px-6 py-8 mx-auto max-w-7xl md:py-24 lg:py-12 lg:px-8">
            {children}
        </div>
    );
}
