import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-900 text-white">
    <Head>
      <title>Star Wars Character Encyclopedia</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-300 transition duration-300"
        >
          Star Wars Character Encyclopedia
        </Link>
      </nav>
    </header>

    <main className="container mx-auto px-6 py-8">{children}</main>

    <footer className="bg-gray-800 text-center py-4">
      <p>&copy; {new Date().getFullYear()} Star Wars Character Encyclopedia</p>
    </footer>
  </div>
);

export default Layout;
