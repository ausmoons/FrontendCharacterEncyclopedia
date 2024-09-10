import React from 'react';
import LinkButton from '@components/ui/LinkButton';
import { PiStarThin } from 'react-icons/pi';
import styles from '@styles/components/layout/Layout.module.scss';
import { LayoutProps } from '@/interfaces/layout';

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container} data-testid="layout-container">
    <header className={styles.header} data-testid="layout-header">
      <div className={styles.headerContent}>
        <PiStarThin className={styles.headerIcon} data-testid="header-icon" />
        <LinkButton
          href="/"
          className={styles.linkButton}
          variant="text"
          data-testid="home-link"
        >
          Star Wars Character Encyclopedia
        </LinkButton>
      </div>
    </header>

    <main className={styles.main} data-testid="layout-main">
      {children}
    </main>

    <footer className={styles.footer} data-testid="layout-footer">
      <p className={styles.footerText}>
        &copy; {new Date().getFullYear()} Star Wars Character Encyclopedia
        developed by Liva
      </p>
    </footer>
  </div>
);

export default Layout;