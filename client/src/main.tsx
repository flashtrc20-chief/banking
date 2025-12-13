import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Google Analytics 4 Integration for SEO tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics if in production
if (import.meta.env.PROD) {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = window.gtag || function() {
    // @ts-ignore
    (window.gtag.q = window.gtag.q || []).push(arguments);
  };
  window.gtag('js', new Date());
  
  // Configure with your GA4 Measurement ID
  // Replace 'GA_MEASUREMENT_ID' with your actual GA4 ID when you have one
  window.gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: 'Bolt Crypto Flasher',
    page_location: window.location.href,
    send_page_view: true
  });
}

createRoot(document.getElementById("root")!).render(<App />);
