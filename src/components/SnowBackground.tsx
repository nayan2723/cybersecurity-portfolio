import React, { useState, useEffect } from 'react';
import PixelSnow from '@/components/PixelSnow';

interface SnowBackgroundProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const SnowBackground: React.FC<SnowBackgroundProps> = ({ targetRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [themeColor, setThemeColor] = useState('#ffffff');
  const [themeOpacity, setThemeOpacity] = useState(1);

  useEffect(() => {
    const updateThemeSettings = () => {
      const isHacker = document.documentElement.classList.contains('hacker');
      const isLight = document.documentElement.classList.contains('light');
      
      if (isHacker) {
        setThemeColor('#22c55e'); // cyber green for hacker theme
        setThemeOpacity(0.4); // slightly lower opacity for matrix effect
      } else if (isLight) {
        setThemeColor('#94a3b8'); // slate-400 (light gray-blue) for light theme
        setThemeOpacity(0.6);
      } else {
        setThemeColor('#ffffff'); // pure white for dark theme
        setThemeOpacity(0.8);
      }
    };

    // Initial check
    updateThemeSettings();

    // Observe theme changes on html element
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateThemeSettings();
        }
      });
    });

    themeObserver.observe(document.documentElement, { attributes: true });

    return () => themeObserver.disconnect();
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: isVisible ? themeOpacity : 0,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.8s ease',
        willChange: 'opacity',
      }}
    >
      <PixelSnow
        color={themeColor}
        flakeSize={0.01}
        minFlakeSize={1.25}
        pixelResolution={200}
        speed={1.25}
        density={0.3}
        direction={125}
        brightness={1}
        depthFade={8}
        farPlane={20}
        gamma={0.4545}
        variant="square"
      />
    </div>
  );
};

export default React.memo(SnowBackground);
