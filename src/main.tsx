import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './design-system/tokens.css';
import './design-system/components.css';
import './app.css';

const root = document.getElementById('root');
if (!root) throw new Error('ATOM root element #root is missing');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary><App /></ErrorBoundary>
  </React.StrictMode>,
);
