import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced smooth scroll for anchor links - optimized to prevent forced reflows
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const href = link?.getAttribute('href');
        
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.getElementById(href.slice(1));
          
          if (targetElement) {
            // Use scrollIntoView with block: 'start' to avoid reading offsetTop
            // This prevents forced reflow by letting the browser handle positioning
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Adjust for fixed header without forcing layout calculation
            window.scrollBy({
              top: -80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return null;
};

export default SmoothScroll;