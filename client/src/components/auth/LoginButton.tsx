import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../contexts/AuthContext";

interface LoginButtonProps {
  email: string;
  password: string;
}

export function LoginButton({ email, password }: LoginButtonProps) {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    console.log("Direct login button clicked");
    if (!email || !password) {
      console.error("Email or password is missing");
      return;
    }

    setIsSubmitting(true);
    console.log("Logging in with:", email, password);
    
    // Direct login with delay
    setTimeout(() => {
      try {
        login(email, password);
        console.log("Login function completed");
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <Button
      type="button" // Changed to button to prevent form submission
      className="w-full mt-4"
      disabled={isSubmitting}
      onClick={handleLogin}
    >
      {isSubmitting ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </span>
      ) : (
        'Sign in directly'
      )}
    </Button>
  );
}