import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'animate.css'

// Defer AOS initialization to improve initial load performance
const initAOS = async () => {
  const AOS = (await import('aos')).default;
  await import('aos/dist/aos.css');
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });
};

// Initialize AOS after page load
const scheduleInit = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initAOS());
  } else {
    setTimeout(() => initAOS(), 1);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleInit);
} else {
  scheduleInit();
}

createRoot(document.getElementById("root")!).render(<App />);
