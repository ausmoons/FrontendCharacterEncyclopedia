import React from 'react';
import { ErrorMessageProps } from '@/types/error';
import styles from '@styles/components/ui/ErrorMessage.module.scss';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ type, message }) => (
  <div className={`${styles.errorContainer} ${styles[type.toLowerCase()]}`}>
    <p className={styles.errorMessage}>{message}</p>
  </div>
);

export default React.memo(ErrorMessage);
