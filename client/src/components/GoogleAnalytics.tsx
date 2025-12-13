import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    // Only run in production
    if (import.meta.env.PROD) {
      // Google Analytics Global Site Tag (gtag.js)
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          cookie_flags: 'secure;samesite=strict'
        });

        // Enhanced e-commerce tracking for subscription events
        gtag('config', 'GA_MEASUREMENT_ID', {
          custom_map: {
            custom_parameter_1: 'subscription_plan',
            custom_parameter_2: 'transaction_type'
          }
        });
      `;
      document.head.appendChild(script2);

      // Make gtag available globally
      window.gtag = (...args: any[]) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(args);
      };

      // Track initial page view
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        send_to: 'GA_MEASUREMENT_ID'
      });
    }
  }, []);

  return null;
};

export default GoogleAnalytics;

// Helper functions for tracking events
export const trackSubscription = (plan: string, value: number) => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `sub_${Date.now()}`,
      value: value,
      currency: 'USD',
      items: [{
        item_id: plan.toLowerCase(),
        item_name: `${plan} Subscription`,
        item_category: 'subscription',
        price: value,
        quantity: 1
      }]
    });
  }
};

export const trackTransaction = (crypto: string, amount: number, network: string) => {
  if (window.gtag) {
    window.gtag('event', 'crypto_transaction', {
      custom_parameter_1: crypto,
      custom_parameter_2: 'flash_transaction',
      value: amount,
      currency: crypto,
      method: network
    });
  }
};