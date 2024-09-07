import React, { ButtonHTMLAttributes } from 'react';
import styles from '@styles/components/ui/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    className = '',
    ...props
}) => {
    const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    return (
        <button className={buttonClasses} disabled={isLoading} {...props}>
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;