import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  FieldPolicy,
} from '@apollo/client';
import { useMemo } from 'react';
import { AllPeopleConnection } from '@/types/apollo';

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
              merge(
                existing: AllPeopleConnection | undefined,
                incoming: AllPeopleConnection,
                { args }: { args: { after?: string } }
              ): AllPeopleConnection {
                const edges = existing ? [...existing.edges] : [];
                if (incoming) {
                  if (args?.after) {
                    incoming.edges.forEach((edge) => {
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
            } as FieldPolicy<
              AllPeopleConnection,
              AllPeopleConnection,
              { after?: string }
            >,
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
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
