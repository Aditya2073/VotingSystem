
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Skip mongoose client-side model instantiation issues
// This prevents crypto/bcrypt related errors in the browser
// since those operations should only happen on the server
if (typeof window !== 'undefined') {
  // Apply polyfill or workaround for client-side crypto
  window.global = window;
}

createRoot(document.getElementById("root")!).render(<App />);
