/**
 * Based on https://github.com/nareshbhatia/react-force
 */
import React, { Component } from 'react';
import {
  ErrorFallbackComponent,
  ErrorFallbackComponentProps,
} from './ErrorFallbackComponent';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  FallbackComponent: React.ComponentType<ErrorFallbackComponentProps>;
  logError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static defaultProps = {
    FallbackComponent: ErrorFallbackComponent,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getDerivedStateFromError(error: any) {
    // Update state so that the next render will show the fallback UI
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    const { logError } = this.props;
    if (logError) {
      logError(error, errorInfo);
    }
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error } = this.state;

    if (error) {
      return <FallbackComponent error={error} />;
    }

    return children;
  }
}
