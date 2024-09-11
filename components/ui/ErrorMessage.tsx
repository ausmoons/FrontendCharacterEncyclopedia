import React from 'react';
import { ErrorMessageProps } from '@/interfaces/error';
import styles from '@styles/components/ui/ErrorMessage.module.scss';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ type, message }) => (
  <div
    className={`${styles.errorContainer} ${styles[type.toLowerCase()]}`}
    data-testid="error-message"
  >
    <p className={styles.errorMessage}>{message}</p>
  </div>
);

export default React.memo(ErrorMessage);
