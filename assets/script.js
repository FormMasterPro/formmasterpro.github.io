// Main JavaScript for FormMasterPro website

/**
 * Initialize components when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Update all links to use consistent domain
  if (typeof updatePageLinks === 'function') {
    updatePageLinks();
  }
  
  // Initialize other components
  initializeNavigation();
  setupFormInteractions();
  
  // Deferred analytics loading - use 'idle', 'defer', or 'interaction'
  if (window.analyticsLoader) {
    window.analyticsLoader.init('idle');
  }

  // Track important conversion events
  setupEventTracking();

  // Highlight current page in navigation
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (currentLocation.endsWith(linkPath) || 
       (currentLocation.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile navigation toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      const nav = document.querySelector('nav ul');
      nav.classList.toggle('show');
    });
  }
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current FAQ item
        item.classList.toggle('active');
      });
    });
    
    // Open the first FAQ item by default
    faqItems[0].classList.add('active');
  }
  
  // Demo screenshots carousel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentSlide = index;
    }
    
    // Set up dot navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });
    
    // Auto-rotate slides
    if (slides.length > 1) {
      setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
      }, 5000);
    }
    
    // Initialize first slide
    if (slides.length > 0) {
      showSlide(0);
    }
  }
  
  // Interactive demo button
  const demoButton = document.querySelector('.try-demo-button');
  if (demoButton) {
    demoButton.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Interactive demo coming soon! Please check back later or watch our demo video for now.');
    });
  }
});

/**
 * Setup tracking for important user interactions
 */
function setupEventTracking() {
  // Track downloads
  document.querySelectorAll('a[href*="chromewebstore.google.com"]').forEach(link => {
    link.addEventListener('click', function() {
      if (window.analyticsLoader) {
        window.analyticsLoader.trackEvent('Conversion', 'Download', 'Chrome Extension');
      }
    });
  });
  
  // Track documentation views
  if (window.location.pathname.includes('docs.html')) {
    if (window.analyticsLoader) {
      window.analyticsLoader.trackEvent('Engagement', 'View', 'Documentation');
    }
  }
  
  // Track demo views
  const demoButtons = document.querySelectorAll('.try-demo-button');
  if (demoButtons.length > 0) {
    demoButtons.forEach(button => {
      button.addEventListener('click', function() {
        if (window.analyticsLoader) {
          window.analyticsLoader.trackEvent('Engagement', 'Demo', 'Interactive Demo');
        }
      });
    });
  }
}
