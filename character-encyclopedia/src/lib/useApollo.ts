import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import { createApolloClient } from './apolloClient';

type InitialApolloState = NormalizedCacheObject | null;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export function initializeApollo(initialState: InitialApolloState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore({ ..._apolloClient.extract(), ...initialState });
    }

    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: InitialApolloState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
