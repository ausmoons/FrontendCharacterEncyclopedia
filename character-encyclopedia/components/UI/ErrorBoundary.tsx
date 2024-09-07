import React, { ReactNode, useState, useEffect } from 'react';
import Button from './Button';
import styles from '@styles/components/ui/ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Uncaught error:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);

    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      fallback || (
        <div className={styles.errorContainer} role="alert">
          <strong className={styles.errorTitle}>Oops! </strong>
          <span className={styles.errorMessage}>Something went wrong.</span>
          <div className={styles.buttonWrapper}>
            <Button onClick={() => setHasError(false)} variant="danger">
              Try again
            </Button>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;