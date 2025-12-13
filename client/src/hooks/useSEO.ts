import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  twitterImage,
  noIndex,
  structuredData
}: SEOOptions) {
  const baseUrl = import.meta.env.PROD ? 'https://boltflasher.live' : 'http://localhost:5000';

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper function to update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Update meta tags
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    if (title) {
      updateMetaTag('og:title', title, true);
      updateMetaTag('twitter:title', title);
    }

    if (canonical) {
      const fullCanonical = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`;
      updateLinkTag('canonical', fullCanonical);
      updateMetaTag('og:url', fullCanonical, true);
    }

    if (ogImage) {
      const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
      updateMetaTag('og:image', fullOgImage, true);
    }

    if (twitterImage) {
      const fullTwitterImage = twitterImage.startsWith('http') ? twitterImage : `${baseUrl}${twitterImage}`;
      updateMetaTag('twitter:image', fullTwitterImage);
    }

    if (noIndex !== undefined) {
      updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    }

    // Add structured data
    if (structuredData) {
      let script = document.getElementById('structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Track page view for analytics
    if (typeof window !== 'undefined' && window.gtag && title) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: window.location.href,
        send_page_view: true
      });
    }
  }, [title, description, keywords, canonical, ogImage, twitterImage, noIndex, structuredData, baseUrl]);
}

// Predefined SEO configurations for common pages
export const seoConfigs = {
  homepage: {
    title: "⚡ Bolt Crypto Flasher - Professional Cryptocurrency Flash Platform",
    description: "Professional cryptocurrency flash transaction platform supporting Bitcoin, USDT, Ethereum, and BNB across multiple networks. Advanced gas fee management and real-time tracking.",
    keywords: "crypto gateway, flash USDT, bitcoin transaction, ethereum transfer, cryptocurrency platform, crypto wallet, blockchain transaction",
    canonical: "/",
    ogImage: "/og-image.png",
    twitterImage: "/twitter-image.png"
  },
  dashboard: {
    title: "⚡ Dashboard - Bolt Crypto Flasher",
    description: "Monitor your cryptocurrency flash transactions, track balances, and manage your crypto portfolio. Real-time analytics for Bitcoin, USDT, Ethereum, and BNB transactions.",
    canonical: "/dashboard",
    ogImage: "/dashboard-preview.png"
  },
  pricing: {
    title: "💎 Pricing Plans - Bolt Crypto Flasher",
    description: "Choose your cryptocurrency flash transaction plan. Basic ($550), Pro ($950), or Full ($3000) access. Professional crypto platform with multi-network support and advanced features.",
    canonical: "/pricing",
    ogImage: "/pricing-preview.png"
  },
  send: {
    title: "💸 Send Crypto - Bolt Crypto Flasher",
    description: "Send flash cryptocurrency transactions across Bitcoin, Ethereum, BSC, and Tron networks. Professional multi-chain transaction platform with advanced gas fee management.",
    canonical: "/send",
    ogImage: "/send-preview.png"
  }
};