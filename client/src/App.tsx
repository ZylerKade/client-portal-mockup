import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useState, useEffect } from "react";

// Simplified direct authentication check for mockup
function useSimpleAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check localStorage directly on component mount and whenever storage changes
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      console.log("Direct localStorage check:", auth);
      setIsAuthenticated(auth === "true");
    };
    
    // Check on mount
    checkAuth();
    
    // Also listen for storage events (in case other tabs change it)
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  
  return { isAuthenticated };
}

function Router() {
  // Use both authentication methods for maximum compatibility
  const { isAuthenticated: contextAuth } = useAuth();
  const { isAuthenticated: directAuth } = useSimpleAuth();
  
  // Use either authentication method (OR operator)
  const isAuthenticated = contextAuth || directAuth;
  
  console.log("Router rendered, isAuthenticated:", isAuthenticated, 
    "(context:", contextAuth, ", direct:", directAuth, ")");

  return (
    <Switch>
      <Route path="/" component={isAuthenticated ? DashboardPage : LoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
