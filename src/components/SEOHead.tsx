import { useEffect } from 'react';
import { SEOProps } from '@/types/global';

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

const SEOHead = ({ 
  title = "Nayan Kshitij - Cybersecurity Enthusiast | Portfolio",
  description = "Cybersecurity enthusiast and CSE student at Bennett University. Passionate about ethical hacking, web development, and secure systems.",
  keywords = "cybersecurity, ethical hacking, web development, portfolio, computer science, Bennett University, penetration testing, vulnerability assessment",
  image = "https://i.ibb.co/LhYB87c6/Urban-Stillness-Amidst-Evening-Rush.png",
  url = "https://nayan-sec.vercel.app/",
  children
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }
    
    // Update Twitter cards
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', image);
    }
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Nayan Kshitij",
      "jobTitle": "Cybersecurity Student & Full-Stack Developer",
      "url": url,
      "image": image,
      "sameAs": [
        "https://github.com/nayan2723",
        "https://www.linkedin.com/in/nayan-kshitij"
      ],
      "knowsAbout": [
        "Cybersecurity",
        "Ethical Hacking",
        "Web Development",
        "Penetration Testing",
        "Vulnerability Assessment"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Bennett University"
      }
    };
    
    // Remove existing structured data
    const existingLD = document.querySelector('script[type="application/ld+json"]');
    if (existingLD) {
      existingLD.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
  }, [title, description, keywords, image, url]);

  return <>{children}</>;
};

export default SEOHead;