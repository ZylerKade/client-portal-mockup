import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/auth/AuthForm";

export default function LoginPage() {
  const { isLoginMode, toggleAuthMode } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-lg bg-primary text-white flex items-center justify-center">
              <i className="ri-dashboard-fill text-2xl"></i>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Simple Client Dashboard</h1>
          <p className="text-slate-600 mt-1">
            {isLoginMode ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {/* Form Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button 
              className={`py-2 px-4 font-medium ${isLoginMode ? 'border-b-2 border-primary text-primary' : 'text-slate-600'}`}
              onClick={() => isLoginMode ? null : toggleAuthMode()}
            >
              Login
            </button>
            <button 
              className={`py-2 px-4 font-medium ${!isLoginMode ? 'border-b-2 border-primary text-primary' : 'text-slate-600'}`}
              onClick={() => !isLoginMode ? null : toggleAuthMode()}
            >
              Sign Up
            </button>
          </div>

          {/* Auth Form Component */}
          <AuthForm />

          {/* Demo Info */}
          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 text-sm">
              <strong>Demo Mode:</strong> No real authentication. Enter any email/password to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
