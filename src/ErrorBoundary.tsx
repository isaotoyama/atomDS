import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { error: Error | null }

/** Prevent React render failures from leaving an unexplained blank screen. */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ATOM render failed', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ minHeight: '100vh', padding: '64px 24px', background: '#090e1b', color: '#eef3fc', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: 600, margin: 'auto' }}>
            <h1>ATOM encountered a rendering error</h1>
            <p>Check your browser console, then reload the page. The error below may help locate the issue.</p>
            <pre style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap', padding: 20, borderRadius: 10, background: '#111827' }}>{this.state.error.message}</pre>
            <button type="button" onClick={() => window.location.reload()} style={{ cursor: 'pointer', padding: '12px 20px', border: 0, borderRadius: 8, background: '#528aff', color: '#081226', fontWeight: 700 }}>Reload ATOM</button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
