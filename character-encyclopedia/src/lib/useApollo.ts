import { ApolloClient, InMemoryCache, NormalizedCacheObject, FieldPolicy, Reference } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        allPeople: {
                            keyArgs: false,
                            merge(existing: any, incoming: any, { args }: { args: { after?: string } }): any {
                                const edges = existing ? existing.edges.slice(0) : [];
                                if (incoming) {
                                    if (args?.after) {
                                        incoming.edges.forEach((edge: Reference) => {
                                            edges.push(edge);
                                        });
                                    } else {
                                        return incoming;
                                    }
                                }
                                return {
                                    ...incoming,
                                    edges,
                                };
                            },
                        } as FieldPolicy<any, any, any>,
                    },
                },
            },
        }),
    });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}