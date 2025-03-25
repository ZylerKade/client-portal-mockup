import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types";
import { LoginButton } from "./LoginButton";

// Form schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional()
});

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function AuthForm() {
  const { isLoginMode, login, signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Handle login form submission
  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted with data:", data);
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      login(data.email, data.password);
      setIsSubmitting(false);
    }, 800);
  };

  // Handle signup form submission
  const onSignupSubmit = (data: SignupFormValues) => {
    console.log("Signup form submitted with data:", data);
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        email: data.email
      };
      signup(user, data.password);
      setIsSubmitting(false);
    }, 800);
  };

  if (isLoginMode) {
    return (
      <Form {...loginForm}>
        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
          loginForm.handleSubmit(onLoginSubmit)(e);
        }}>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="you@example.com" 
                    type="email" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <a href="#" className="text-sm text-primary hover:text-primary/90">
                    Forgot password?
                  </a>
                </div>
                <FormControl>
                  <Input 
                    placeholder="••••••••" 
                    type="password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal cursor-pointer">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />

          <Button 
            type="button" 
            className="w-full" 
            disabled={isSubmitting}
            onClick={() => {
              console.log("Sign in button clicked");
              const email = loginForm.getValues("email");
              const password = loginForm.getValues("password");
              console.log("Submitting with:", email, password);
              
              if (email && password) {
                setIsSubmitting(true);
                
                // For demo purposes, we're using setTimeout to simulate a network request
                setTimeout(() => {
                  try {
                    // Direct approach: set localStorage directly for mockup
                    console.log("Setting localStorage directly");
                    localStorage.setItem("isAuthenticated", "true");
                    
                    // Create mock user
                    const mockUser = {
                      email: email,
                      firstName: "John",
                      lastName: "Doe",
                      name: "John Doe",
                      company: "Acme Inc"
                    };
                    localStorage.setItem("user", JSON.stringify(mockUser));
                    
                    // Call login for context update
                    login(email, password);
                    
                    console.log("Login successful, redirecting...");
                    // Force redirect for mockup
                    window.location.reload();
                  } catch (error) {
                    console.error("Login error:", error);
                  } finally {
                    setIsSubmitting(false);
                  }
                }, 800);
              }
            }}
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
              'Sign in'
            )}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...signupForm}>
      <form className="space-y-5" onSubmit={(e) => {
        e.preventDefault();
        signupForm.handleSubmit(onSignupSubmit)(e);
      }}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={signupForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={signupForm.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="you@example.com" 
                  type="email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  placeholder="••••••••" 
                  type="password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal cursor-pointer">
                Remember me
              </FormLabel>
            </FormItem>
          )}
        />

        <Button 
          type="button" 
          className="w-full"
          disabled={isSubmitting}
          onClick={() => {
            console.log("Create account button clicked");
            const formValues = signupForm.getValues();
            console.log("Manually submitting signup with:", formValues);
            
            if (formValues.email && formValues.password && formValues.firstName && formValues.lastName) {
              setIsSubmitting(true);
              setTimeout(() => {
                try {
                  // Create user
                  const user: User = {
                    firstName: formValues.firstName,
                    lastName: formValues.lastName,
                    company: formValues.company,
                    email: formValues.email,
                    name: `${formValues.firstName} ${formValues.lastName}`
                  };
                  
                  // Direct approach: set localStorage directly
                  console.log("Setting user directly in localStorage");
                  localStorage.setItem("isAuthenticated", "true");
                  localStorage.setItem("user", JSON.stringify(user));
                  
                  // Call signup for any context updates
                  signup(user, formValues.password);
                  
                  console.log("Signup successful, redirecting...");
                  // Force redirect for mockup
                  window.location.reload();
                } catch (error) {
                  console.error("Signup error:", error);
                } finally {
                  setIsSubmitting(false);
                }
              }, 800);
            }
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </Form>
  );
}
