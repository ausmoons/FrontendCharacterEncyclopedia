import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/useApollo';
import ErrorBoundary from '@components/ui/ErrorBoundary';
import ErrorMessage from '@components/ui/ErrorMessage';
import { handleError, logError } from '@utils/errorHandling';
import Layout from '@components/layout/Layout';
import '@styles/globals.scss';
import { ErrorType } from '@/types/error';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const handleErrorLogging = React.useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
      const errorDetails = handleError(error);
      logError({ ...errorDetails, technical: JSON.stringify(errorInfo) });
    },
    []
  );

  const mapErrorToErrorType = (error: Error): ErrorType => {
    if (error.name === 'NetworkError') return 'NETWORK_ERROR';
    if (error.name === 'GraphQLError') return 'GRAPHQL_ERROR';
    if (error.name === 'NotFoundError') return 'NOT_FOUND';
    return 'UNKNOWN_ERROR';
  };

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
      <ApolloProvider client={apolloClient}>
        <Layout>
          <ErrorBoundary
            onError={handleErrorLogging}
            fallback={(error) => (
              <ErrorMessage
                type={mapErrorToErrorType(error)}
                message={error.message}
              />
            )}
          >
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default App;
