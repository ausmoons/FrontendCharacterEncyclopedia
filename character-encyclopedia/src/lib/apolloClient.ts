import { ApolloClient, InMemoryCache } from '@apollo/client';

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Disables force-fetching on the server (so queries are only run once)
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // SWAPI GraphQL API endpoint
        cache: new InMemoryCache(),
    });
}
