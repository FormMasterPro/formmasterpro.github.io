document.addEventListener('DOMContentLoaded', function() {
  // Load all components with data-component attribute
  document.querySelectorAll('[data-component]').forEach(function(element) {
    const componentName = element.getAttribute('data-component');
    
    fetch(`/components/${componentName}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${componentName}`);
        }
        return response.text();
      })
      .then(html => {
        element.innerHTML = html;
      })
      .catch(error => {
        console.error(error);
        element.innerHTML = `<p>Error loading component: ${componentName}</p>`;
      });
  });
});
