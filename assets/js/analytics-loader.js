/**
 * Optimized Google Analytics / Tag Manager Loader
 * Reduces initial JavaScript payload by lazy-loading analytics
 * only when needed or when browser is idle
 */

class AnalyticsLoader {
  constructor(id) {
    this.analyticsId = id;
    this.isLoaded = false;
    this.eventQueue = [];
  }

  /**
   * Initialize the analytics loader with optional trigger mode
   * @param {string} mode - 'idle' | 'defer' | 'interaction' | 'immediate'
   */
  init(mode = 'idle') {
    switch (mode) {
      case 'idle':
        // Load when browser is idle (best for performance)
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => this.loadAnalytics());
        } else {
          // Fallback to setTimeout for browsers without requestIdleCallback
          setTimeout(() => this.loadAnalytics(), 2000);
        }
        break;
      
      case 'defer':
        // Load after page is fully loaded
        window.addEventListener('load', () => {
          setTimeout(() => this.loadAnalytics(), 1000);
        });
        break;
      
      case 'interaction':
        // Load after first user interaction
        const interactionEvents = ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'];
        const loadHandler = () => {
          this.loadAnalytics();
          // Remove all event listeners after loading
          interactionEvents.forEach(event => {
            document.removeEventListener(event, loadHandler);
          });
        };
        
        interactionEvents.forEach(event => {
          document.addEventListener(event, loadHandler, { once: true, passive: true });
        });
        break;
      
      case 'immediate':
        // Load immediately (not recommended)
        this.loadAnalytics();
        break;
    }
  }

  /**
   * Actual analytics loading function
   */
  loadAnalytics() {
    if (this.isLoaded) return;
    
    console.log('Loading Google Analytics...');
    
    // Create script elements
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${this.analyticsId}`;
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.analyticsId, {
      'anonymize_ip': true,
      'send_page_view': true
    });
    
    // Append script to the document
    document.head.appendChild(scriptTag);
    this.isLoaded = true;
    
    // Process any events that were queued before loading
    this.processQueue();
  }
  
  /**
   * Queue events before analytics is loaded
   */
  trackEvent(category, action, label, value) {
    if (this.isLoaded && window.gtag) {
      window.gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    } else {
      // Queue the event for later
      this.eventQueue.push({ category, action, label, value });
    }
  }
  
  /**
   * Process queued events once analytics is loaded
   */
  processQueue() {
    if (!this.isLoaded) return;
    
    this.eventQueue.forEach(event => {
      window.gtag('event', event.action, {
        'event_category': event.category,
        'event_label': event.label,
        'value': event.value
      });
    });
    
    // Clear the queue
    this.eventQueue = [];
  }
}

// Create singleton instance for use across the site
window.analyticsLoader = new AnalyticsLoader('G-0087JV38VS');
