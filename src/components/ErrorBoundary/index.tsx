import React, { Component, ReactNode } from "react";

import NotFoundLogo from "../../assets/ninja-404.svg";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // We can log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="flex flex-row items-center mx-auto my-10 text-center max-w-sm flex-wrap">
              <div>
                <h1 className="font-medium text-5xl leading-10">Wooops! Something went wrong :(</h1>
              </div>
              <div>
                <div className="py-7">
                  <p> {this.state.error && <pre>{this.state.error.message}</pre>}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center sm:h-screen w-auto">
              <img
                src={NotFoundLogo}
                fetchPriority="high"
                alt="Not Found"
                loading="lazy"
                width={425}
                height={504}
                className="inline-block align-middle w-[424px]"
              />
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
