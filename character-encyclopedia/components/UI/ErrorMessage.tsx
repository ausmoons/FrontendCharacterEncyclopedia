import React from 'react';
import styles from '@styles/components/ui/ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className={styles.errorContainer} role="alert">
    <strong className={styles.errorTitle}>Error: </strong>
    <span className={styles.errorMessage}>{message}</span>
  </div>
);

export default ErrorMessage;
