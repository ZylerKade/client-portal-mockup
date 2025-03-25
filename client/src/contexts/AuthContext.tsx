import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoginMode: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (user: User, password: string) => void;
  logout: () => void;
  toggleAuthMode: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoginMode: true,
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  toggleAuthMode: () => {}
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>("isAuthenticated", false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const { toast } = useToast();

  const login = (email: string, password: string) => {
    console.log("Login function called with:", email, password);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      console.log("Users from localStorage:", users);
      
      const existingUser = users.find((u: User) => u.email === email);
      console.log("Existing user found:", existingUser);
      
      if (existingUser) {
        // In a real app we would validate the password here
        console.log("Setting user and auth state for existing user");
        
        // Force setting these values directly to localStorage as well
        localStorage.setItem("user", JSON.stringify(existingUser));
        localStorage.setItem("isAuthenticated", "true");
        
        setUser(existingUser);
        setIsAuthenticated(true);
        
        console.log("Auth state after login:", { user: existingUser, isAuthenticated: true });
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${existingUser.firstName}!`,
          variant: "default"
        });
        
        // Force redirect to dashboard
        setTimeout(() => {
          console.log("Redirecting to dashboard...");
          window.location.href = "/";
        }, 500);
      } else {
        // For the mock functionality, we'll create a user if not found
        console.log("Creating new user for first-time login");
        const newUser: User = {
          email,
          firstName: "John",
          lastName: "Doe",
          name: "John Doe",
          company: "Acme Inc"
        };
        
        // Force setting these values directly to localStorage as well
        console.log("Setting user in state and localStorage");
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("isAuthenticated", "true");
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        console.log("Auth state after login:", { user: newUser, isAuthenticated: true });
        
        // Save the user to localStorage
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        
        toast({
          title: "Login Successful",
          description: "Welcome to your dashboard!",
          variant: "default"
        });
        
        // Force redirect to dashboard
        setTimeout(() => {
          console.log("Redirecting to dashboard...");
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      console.error("Error during login process:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const signup = (user: User, password: string) => {
    console.log("Signup function called with user:", user);
    
    // Simple validation
    if (!user.email || !password || !user.firstName || !user.lastName) {
      toast({
        title: "Signup Failed",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("Existing users:", users);
    
    const existingUser = users.find((u: User) => u.email === user.email);
    console.log("Found existing user?", existingUser);
    
    if (existingUser) {
      toast({
        title: "Signup Failed",
        description: "A user with this email already exists",
        variant: "destructive"
      });
      return;
    }

    // Create a new user
    const newUser: User = {
      ...user,
      name: `${user.firstName} ${user.lastName}`
    };
    console.log("Created new user:", newUser);
    
    // Save to localStorage directly as well
    console.log("Saving to localStorage directly");
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    
    // Save to users collection in localStorage
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    
    // Set as current user
    console.log("Setting user state via hooks");
    setUser(newUser);
    setIsAuthenticated(true);
    
    toast({
      title: "Account Created",
      description: "Your account was created successfully!",
      variant: "default"
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      variant: "default"
    });
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoginMode,
        user,
        login,
        signup,
        logout,
        toggleAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
