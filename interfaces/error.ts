import { ErrorType } from '@/types/error';
import { ReactNode, ErrorInfo } from 'react';

export interface ErrorDetails {
  type: ErrorType;
  message: string;
  technical?: string;
}

export interface ErrorMessageProps {
  type: ErrorType;
  message: string;
}

export interface DefaultErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
