import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ShieldAlert } from "lucide-react";
// import "@lottiefiles/lottie-player";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

export default function Unauthorized() {
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
            style={{ height: '250px', width: '250px' }}
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-destructive/20">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page. Please contact the administrator if you believe this is an error.
        </p>

        {/* Action Button */}
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>

        {/* Additional options */}
        <div className="mt-6 text-sm text-muted-foreground">
          <p>Or try to <Link to="/login" className="text-primary hover:underline">sign in</Link> with a different account</p>
        </div>
      </motion.div>
    </div>
  );
}