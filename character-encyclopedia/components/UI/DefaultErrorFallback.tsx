import React from 'react';
import Button from './Button';
import styles from '@styles/components/ui/Error.module.scss';

interface DefaultErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({
  error,
  resetError,
}) => (
  <div className={styles.errorContainer} role="alert">
    <h1 className={styles.errorTitle}>Oops! An Error Occurred</h1>
    <p className={styles.errorMessage}>
      {error.message || 'Something went wrong.'}
    </p>
    <p className={styles.errorDetails}>
      We apologize for the inconvenience. Please try again or contact support if
      the problem persists.
    </p>
    <div className={styles.buttonWrapper}>
      <Button onClick={resetError} variant="danger">
        Try Again
      </Button>
    </div>
  </div>
);

export default React.memo(DefaultErrorFallback);
