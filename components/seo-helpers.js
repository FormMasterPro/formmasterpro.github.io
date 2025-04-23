/**
 * SEO Helper Functions for FormMasterPro
 * 
 * This file provides utility functions for SEO optimization
 * and URL consistency across the site.
 */

/**
 * Ensures all URLs use the preferred domain format (with www)
 * @param {string} url - The URL to normalize
 * @returns {string} - The normalized URL
 */
function normalizeUrl(url) {
  // Skip normalization for external URLs or relative paths
  if (!url || url.startsWith('#') || url.startsWith('/') || 
      url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  
  try {
    const urlObj = new URL(url);
    
    // If domain is formmasterpro.com (no www), add www
    if (urlObj.hostname === 'formmasterpro.com') {
      urlObj.hostname = 'www.formmasterpro.com';
      return urlObj.toString();
    }
    
    return url;
  } catch (e) {
    // If URL parsing fails, return original URL
    return url;
  }
}

/**
 * Checks if the current page URL matches the preferred format
 * and redirects if necessary
 */
function ensureCorrectDomain() {
  if (window.location.hostname === 'formmasterpro.com') {
    const newUrl = 'https://www.formmasterpro.com' + 
                   window.location.pathname + 
                   window.location.search;
    window.location.replace(newUrl);
  }
}

/**
 * Updates all links on the page to use the preferred domain format
 */
function updatePageLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href.includes('formmasterpro.com')) {
      link.setAttribute('href', normalizeUrl(href));
    }
  });
}

// Apply domain consistency on page load
document.addEventListener('DOMContentLoaded', function() {
  // Ensure canonical link is correct
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', normalizeUrl(canonical.getAttribute('href')));
  }
  
  // Update all internal links to use consistent domain
  updatePageLinks();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeUrl,
    ensureCorrectDomain,
    updatePageLinks
  };
}
