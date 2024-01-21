import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/app.tsx';
import './styles/root.scss';
import { ErrorBoundary } from './app/error-boundary/error-boundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
