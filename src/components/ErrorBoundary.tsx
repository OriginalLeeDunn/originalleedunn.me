"use client";

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
          <div className="p-4 mb-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
          <p className="max-w-md mb-6 text-muted-foreground">
            We&apos;re sorry, but an unexpected error occurred. Please try again later.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={this.handleReset}>
              Try again
            </Button>
            <Button asChild variant="ghost">
              <a href="/">Back to Home</a>
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 p-4 text-left bg-muted/50 rounded-lg max-w-2xl w-full">
              <summary className="text-sm font-medium cursor-pointer">Error details</summary>
              <pre className="mt-2 p-3 bg-background rounded text-xs overflow-auto">
                {this.state.error.toString()}
                <br />
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
