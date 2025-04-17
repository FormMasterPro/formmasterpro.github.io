document.addEventListener("DOMContentLoaded", function() {
  // Find all component placeholders
  document.querySelectorAll('[data-component]').forEach(function(element) {
    const componentName = element.getAttribute('data-component');
    
    // Instead of using fetch, use XMLHttpRequest which has better compatibility with local files
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          element.innerHTML = this.responseText;
          
          // Execute any scripts in the loaded component
          const scripts = element.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
              newScript.setAttribute(attr.name, attr.value);
            });
            newScript.innerHTML = script.innerHTML;
            script.parentNode.replaceChild(newScript, script);
          });
        } else {
          console.error(`Failed to load component: ${componentName}`);
          element.innerHTML = `<div class="error">Failed to load ${componentName}</div>`;
        }
      }
    };
    
    try {
      xhr.open("GET", `components/${componentName}.html`, true);
      xhr.send();
    } catch (err) {
      console.error("Error loading component:", err);
      element.innerHTML = `<div class="error">Error loading ${componentName}</div>`;
    }
  });
});
