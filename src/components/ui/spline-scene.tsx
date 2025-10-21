import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-muted/50">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🚀</div>
          <p className="text-muted-foreground">3D Scene Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-muted/50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <span className="text-muted-foreground">Loading 3D Scene...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => console.log('Spline scene loaded')}
        onError={(error) => {
          console.error('Spline error:', error);
          setError(true);
        }}
      />
    </Suspense>
  );
}
