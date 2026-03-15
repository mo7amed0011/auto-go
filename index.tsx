
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

console.log('AutoGo: Application starting...');

const mountApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('AutoGo: Could not find root element');
      return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('AutoGo: Application mounted successfully');
  } catch (error) {
    console.error('AutoGo: Critical mount error:', error);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}

