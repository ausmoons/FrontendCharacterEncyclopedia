import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/useApollo';
import ErrorBoundary from '@components/ui/ErrorBoundary';
import styles from '@styles/ErrorFallback.module.scss';
import '@styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Application error:', error);
    console.error('Error info:', errorInfo);
  };

  const errorFallback = (error: Error) => (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Oops! Something went wrong</h1>
      <p className={styles.errorMessage}>
        We&apos;re sorry, but an error occurred while loading the application.
      </p>
      <p className={styles.errorDetails}>Error details: {error.message}</p>
    </div>
  );

  return (
    <ErrorBoundary onError={handleError} fallback={errorFallback}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
