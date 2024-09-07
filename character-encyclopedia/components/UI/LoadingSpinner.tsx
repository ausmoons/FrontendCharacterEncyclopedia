import React from 'react';
import styles from '@styles/components/ui/LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner}></div>
  </div>
);

export default LoadingSpinner;