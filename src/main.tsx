import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept benign ResizeObserver loop limit/notification events to avoid unhandled runtime error overlays
window.addEventListener('error', (event) => {
  if (
    typeof event?.message === 'string' &&
    (event.message.includes('ResizeObserver loop') ||
      event.message.includes('ResizeObserver loop completed with undelivered notifications'))
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
