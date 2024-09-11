import React from 'react';
import styles from '@styles/components/ui/Button.module.scss';
import { ButtonProps } from '@/interfaces/button';

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

export default React.memo(Button);
