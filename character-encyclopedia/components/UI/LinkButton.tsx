import React from 'react';
import Link from 'next/link';
import styles from '@styles/components/ui/LinkButton.module.scss';
import { LinkButtonProps } from '@/interfaces/button';

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

export default React.memo(LinkButton);
