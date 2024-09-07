import React from 'react';
import Link, { LinkProps } from 'next/link';
import styles from '@styles/components/ui/LinkButton.module.scss';

interface LinkButtonProps extends LinkProps {
  className?: string;
  variant?: 'text' | 'button';
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  className = '',
  variant = 'text',
  children,
  ...props
}) => {
  const combinedClassName = `${styles.linkButton} ${styles[variant]} ${className}`;

  return (
    <Link href={href} {...props}>
      <span className={combinedClassName}>{children}</span>
    </Link>
  );
};

export default LinkButton;
