import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`lb-card ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }: CardProps) => (
    <div className={`p-4 border-b border-[#2b3440] ${className}`}>
        {children}
    </div>
);

export const CardBody = ({ children, className = '' }: CardProps) => (
    <div className={`px-6 py-4 ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '' }: CardProps) => (
    <div className={`px-6 py-4 border-t border-gray-800 bg-gray-800/50 ${className}`}>
        {children}
    </div>
);
