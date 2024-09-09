import { ApolloError } from '@apollo/client';
import { ErrorDetails } from '@/types/error';

export const handleError = (error: unknown): ErrorDetails => {
  console.error('Error occurred:', error);

  if (error instanceof ApolloError) {
    if (error.networkError) {
      return {
        type: 'NETWORK_ERROR',
        message:
          'Unable to connect to the server. Please check your internet connection.',
        technical: error.message,
      };
    }
    if (error.graphQLErrors.length > 0) {
      return {
        type: 'GRAPHQL_ERROR',
        message: 'There was a problem processing your request.',
        technical: error.message,
      };
    }
  }

  if (error instanceof Error) {
    if (error.message === 'NOT_FOUND') {
      return {
        type: 'NOT_FOUND',
        message: 'The requested resource was not found.',
        technical: error.message,
      };
    }
  }

  return {
    type: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred. Please try again later.',
    technical: error instanceof Error ? error.message : 'Unknown error',
  };
};

export const logError = (error: ErrorDetails) => {
  console.error(`[${error.type}] ${error.message}`, error.technical);
};
