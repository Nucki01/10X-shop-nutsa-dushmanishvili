import { Component, type ErrorInfo, type ReactNode } from 'react'

// Props and State types for ErrorBoundary
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// ErrorBoundary Component (PRD Requirement O2 & P0.6)
// In React, an Error Boundary must be a class component that implements
// `static getDerivedStateFromError` and `componentDidCatch`.
// If any child component throws an unexpected error during rendering, this component catches it
// and displays "Something went wrong." + a "Reload" button instead of a blank screen.
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // Updates state so the next render shows the fallback UI
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  // Logs error details when an error is caught
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-velvety-cream text-velvety-ink flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 p-8 max-w-md w-full text-center space-y-4">
            <h1 className="font-serif text-2xl font-bold text-velvety-ink">
              Something went wrong.
            </h1>
            <p className="text-sm text-stone-600">
              An unexpected error occurred while displaying this page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-3 cursor-pointer transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
