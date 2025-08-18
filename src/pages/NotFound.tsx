import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full animate-float"></div>
      </div>
      
      <div className="text-center z-10 max-w-md mx-auto px-6">
        <div className="cyber-card p-8">
          <div className="mb-6">
            <Search className="w-16 h-16 text-primary mx-auto mb-4 animate-cyberpulse" />
            <h1 className="text-6xl font-bold mb-2 bg-cyber-gradient bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved to a secure location.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()} 
              className="w-full"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Error logged for security analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
