import React from 'react';
import LinkButton from '@components/ui/LinkButton';
import { PiStarThin } from 'react-icons/pi';
import styles from '@styles/components/layout/Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <PiStarThin className={styles.headerIcon} />
        <LinkButton href="/" className={styles.linkButton} variant="text">
          Star Wars Character Encyclopedia
        </LinkButton>
      </div>
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      <p className={styles.footerText}>
        &copy; {new Date().getFullYear()} Star Wars Character Encyclopedia
        developed by Liva
      </p>
    </footer>
  </div>
);

export default Layout;
