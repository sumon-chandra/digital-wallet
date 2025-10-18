import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Unexpected Error";
  let message = "Something went wrong.";
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you are looking for doesn't exist.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You need to be logged in to access this page.";
    } else if (error.status === 403) {
      title = "Forbidden";
      message = "You don't have permission to access this resource.";
    } else if (error.status === 500) {
      title = "Server Error";
      message = "Something went wrong on our servers. Please try again later.";
    } else {
      title = error.statusText || title;
      message = error.data || message;
    }
  }

  // Different Lottie animations based on error type
  const getLottieAnimation = () => {
    if (statusCode === 404) {
      return "https://lottie.host/4b0f7a9f-5c6d-4c3e-8a7f-7a3d3c6a9c3d/4XwUqg2XpW.json";
    } else if (statusCode === 401 || statusCode === 403) {
      return "https://lottie.host/5b5e5c5d-5c6d-4c3e-8a7f-7a3d3c6a9c3d/6XwUqg2XpW.json";
    } else {
      return "https://lottie.host/8d3c6c7a-4a4e-4a3e-8a7f-7a3d3c6a9c3d/5XwUqg2XpW.json";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Code */}
        <motion.div 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-8xl font-bold mb-2 text-destructive"
        >
          {statusCode}
        </motion.div>

        {/* Lottie Animation */}
        <div className="mb-6">
          <Player
            autoplay
            loop
            src={getLottieAnimation()}
            style={{ height: '200px', width: '200px' }}
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-destructive/20">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          {title}
        </h1>

        {/* Message */}
        <p className="text-muted-foreground mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          {/* <Button 
            variant="link" 
            className="border-border text-foreground hover:bg-secondary"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button> */}
        </div>

        {/* Technical details (for development) */}
        {/* {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-secondary rounded-lg text-left">
            <h3 className="text-sm font-semibold mb-2">Error Details (Development Only):</h3>
            <pre className="text-xs text-muted-foreground overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )} */}
      </motion.div>
    </div>
  );
};

export default ErrorPage;