import { Suspense, lazy, useState, useEffect, ComponentType } from 'react';

// Type for Spline component props
interface SplineProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Lazy load Spline with comprehensive error handling
const LazySpline = lazy<ComponentType<SplineProps>>(async () => {
  try {
    const module = await import('@splinetool/react-spline');
    return { default: module.default };
  } catch (error) {
    console.error('Failed to load Spline module:', error);
    // Return a fallback component
    return {
      default: () => (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background/50 to-muted/30">
          <div className="text-center p-8">
            <div className="text-4xl mb-4 opacity-50">🎨</div>
            <p className="text-muted-foreground text-sm">3D Module Unavailable</p>
          </div>
        </div>
      )
    } as any;
  }
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset error state if scene changes
  useEffect(() => {
    setError(false);
    setIsLoaded(false);
  }, [scene]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background/50 to-muted/30">
        <div className="text-center p-8">
          <div className="text-4xl mb-4 opacity-50">🎨</div>
          <p className="text-muted-foreground text-sm">3D Scene Preview</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background/50 to-muted/30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <span className="text-muted-foreground text-sm">Loading 3D...</span>
          </div>
        </div>
      }
    >
      <div className="relative w-full h-full">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/50 to-muted/30 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <span className="text-muted-foreground text-sm">Initializing...</span>
            </div>
          </div>
        )}
        <LazySpline
          scene={scene}
          className={className}
          onLoad={() => {
            console.log('Spline scene loaded successfully');
            setIsLoaded(true);
          }}
          onError={(error) => {
            console.error('Spline loading error:', error);
            setError(true);
          }}
        />
      </div>
    </Suspense>
  );
}
