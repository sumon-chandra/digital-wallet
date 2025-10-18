/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full text-center"
          >
            {/* Lottie Animation */}
            <div className="mb-6">
              <Player
                autoplay
                loop
                src="https://lottie.host/8d3c6c7a-4a4e-4a3e-8a7f-7a3d3c6a9c3d/5XwUqg2XpW.json"
                style={{ height: '200px', width: '200px' }}
              />
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-destructive/20">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Something Went Wrong
            </h1>

            {/* Message */}
            <p className="text-muted-foreground mb-8">
              An unexpected error occurred in the application. Please try refreshing the page or return to the homepage.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-border text-foreground hover:bg-secondary"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </Button>
            </div>

            {/* Technical details (for development) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 p-4 bg-secondary rounded-lg text-left">
                <h3 className="text-sm font-semibold mb-2">Error Details (Development Only):</h3>
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  {this.state.error.toString()}
                </p>
                <pre className="text-xs text-muted-foreground overflow-auto">
                  {this.state.error.stack}
                </pre>
              </div>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;