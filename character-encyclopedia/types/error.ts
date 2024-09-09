export interface ErrorDetails {
  type: ErrorType;
  message: string;
  technical?: string;
}

export interface ErrorMessageProps {
  type: ErrorType;
  message: string;
}

export type ErrorType =
  | 'NETWORK_ERROR'
  | 'GRAPHQL_ERROR'
  | 'NOT_FOUND'
  | 'UNKNOWN_ERROR';
