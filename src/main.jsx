import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Intercept all fetch requests to append ?origin=ca for API requests
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, config] = args;
  let urlString = "";

  if (typeof resource === "string") {
    urlString = resource;
  } else if (resource instanceof URL) {
    urlString = resource.toString();
  } else if (resource && typeof resource === "object" && resource.url) {
    urlString = resource.url;
  }

  const apiUrl = import.meta.env.VITE_API_URL || "";
  // Check if it's a call to our API endpoints
  if (urlString && (urlString.includes(apiUrl) || urlString.includes('/api/'))) {
    try {
      const urlObj = new URL(urlString, window.location.origin);
      urlObj.searchParams.set('origin', 'ca');
      const newUrl = urlObj.toString();

      if (typeof resource === "string") {
        resource = newUrl;
      } else if (resource instanceof URL) {
        resource = new URL(newUrl);
      } else if (resource && typeof resource === "object") {
        resource = new Request(newUrl, resource);
      }
    } catch (err) {
      console.error("Error modifying URL in fetch interceptor:", err);
    }
  }

  return originalFetch(resource, config);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
