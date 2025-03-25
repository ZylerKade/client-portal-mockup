import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

function Router() {
  const { isAuthenticated } = useAuth();
  console.log("Router rendered, isAuthenticated:", isAuthenticated);

  // Force a re-render when auth state changes
  useEffect(() => {
    console.log("Auth state changed, isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

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
