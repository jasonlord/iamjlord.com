import '../../shared/tailwind.css';
import './card.css';
import html from './card.html?raw';

// Auto-inject CSS stylesheet
function injectCSS() {
  // Get the current script's URL to derive the CSS path
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const scriptSrc = currentScript.src;
  
  if (scriptSrc) {
    // Replace .js with .css to get the CSS file URL
    const cssUrl = scriptSrc.replace('/card.js', '/card.css');
    
    // Check if CSS is already loaded
    const existingLink = document.querySelector(`link[href="${cssUrl}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssUrl;
      document.head.appendChild(link);
    }
  }
}

// Auto-render when script loads
function initCard() {
  const container = document.getElementById('tailwind-card');
  if (container) {
    container.innerHTML = html;
    
    // Add any interactivity here
    const button = container.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        console.log('Card button clicked!');
        // Add your custom logic here
      });
    }
  }
}

// Inject CSS first
injectCSS();

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCard);
} else {
  initCard();
}

// Export for manual initialization if needed
export { initCard };

