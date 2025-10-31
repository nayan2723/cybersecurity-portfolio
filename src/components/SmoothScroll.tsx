import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced smooth scroll for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const href = link?.getAttribute('href');
        
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.getElementById(href.slice(1));
          
          if (targetElement) {
            // Use requestAnimationFrame to batch layout reads and avoid forced reflow
            requestAnimationFrame(() => {
              const headerHeight = 80; // Account for fixed header
              const targetPosition = targetElement.offsetTop - headerHeight;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
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