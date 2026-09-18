import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Immigration and Citizenship - Canada.ca';
const DEFAULT_DESCRIPTION = 'Official Government of Canada services for immigration, citizenship, visitor visas, work permits, study permits, and checking application status.';
const DEFAULT_KEYWORDS = 'Canada immigration, IRCC, GCKey login, MyCIC account, Canada visa, work permit Canada, study permit, express entry, check application status';
const SITE_URL = 'https://www.canada.ca';

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = 'website',
  schemaData,
}) {
  const location = useLocation();
  const currentUrl = canonical || `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title ? `${title} | Canada.ca` : DEFAULT_TITLE;

    // Helper function to update or create meta tag
    const setMetaTag = (attr, attrValue, contentValue) => {
      let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper function to update or create link tag
    const setLinkTag = (relValue, hrefValue) => {
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relValue);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Government of Canada');

    // 3. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:site_name', 'Canada.ca');
    setMetaTag('property', 'og:locale', 'en_CA');

    // 4. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:site', '@CitImmCanada');

    // 5. Canonical Link
    setLinkTag('canonical', currentUrl);

    // 6. JSON-LD Structured Data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const jsonLd = schemaData || {
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      name: 'Immigration, Refugees and Citizenship Canada',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      sameAs: [
        'https://twitter.com/CitImmCanada',
        'https://www.facebook.com/CitCanada',
      ],
      description: description,
    };
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      // Cleanup json-ld script on unmount
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, keywords, currentUrl, ogType, schemaData]);

  return null;
}
