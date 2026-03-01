import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}


const variantStyles = {
    primary: 'bg-[#00e054] hover:bg-[#00c04b] text-white',
    secondary: 'bg-[#2b3440] hover:bg-[#445566] text-[#9ab] hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-[#2b3440] text-[#9ab] hover:text-white',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-sm',
};

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
