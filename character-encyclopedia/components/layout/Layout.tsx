import React from 'react';
import Head from 'next/head';
import LinkButton from '@components/ui/LinkButton';
import styles from '@styles/components/layout/Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>Star Wars Character Encyclopedia</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className={styles.header}>
      <LinkButton href="/" className={styles.linkButton} variant="text">
        Star Wars Character Encyclopedia
      </LinkButton>
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
