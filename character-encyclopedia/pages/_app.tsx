import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/useApollo';
import ErrorBoundary from '@components/ui/ErrorBoundary';
import { handleError, logError } from '@utils/errorHandling';
import '@styles/globals.scss';

const ErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({
  error,
  resetError,
}) => {
  const errorDetails = handleError(error);
  return (
    <div className="error-container">
      <h1 className="error-title">Oops! Something went wrong</h1>
      <p className="error-message">{errorDetails.message}</p>
      <p className="error-details">Error type: {errorDetails.type}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  );
};

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const handleErrorLogging = React.useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
      const errorDetails = handleError(error);
      logError({ ...errorDetails, technical: JSON.stringify(errorInfo) });
    },
    []
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Star Wars Character Encyclopedia</title>
        <meta
          name="description"
          content="Explore the Star Wars universe characters"
        />
      </Head>
      <ErrorBoundary
        onError={handleErrorLogging}
        fallback={(error, resetError) => (
          <ErrorFallback error={error} resetError={resetError} />
        )}
      >
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
