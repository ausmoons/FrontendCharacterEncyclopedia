import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/useApollo';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ErrorBoundary>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </ErrorBoundary>
    );
}

export default App;