import React, { ErrorInfo, ReactNode } from 'react';
import Button from './Button';
import styles from '@styles/components/ui/ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.resetError);
      }

      return (
        <div className={styles.errorContainer} role="alert">
          <h1 className={styles.errorTitle}>Oops! An Error Occurred</h1>
          <p className={styles.errorMessage}>
            {this.state.error?.message || 'Something went wrong.'}
          </p>
          <p className={styles.errorDetails}>
            We apologize for the inconvenience. Please try again or contact
            support if the problem persists.
          </p>
          <div className={styles.buttonWrapper}>
            <Button onClick={this.resetError} variant="danger">
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
