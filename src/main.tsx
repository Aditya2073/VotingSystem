
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill for client-side
if (typeof window !== 'undefined') {
  // Make window.global available to prevent errors with mongoose/bcrypt in browser
  window.global = window;
  
  // Add crypto polyfill for bcrypt compatibility in browser
  if (!window.crypto) {
    console.warn('Crypto API not available in this browser - some features may not work correctly');
  }
}

// Catch unhandled errors and log them properly
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error);
});

// Render the application
createRoot(document.getElementById("root")!).render(<App />);
