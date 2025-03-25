import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export function PortfolioBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 relative">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
          <p className="font-medium">
            <span className="font-bold">Demo Only:</span> This is a mock project with limited functionality for portfolio purposes only.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://solomain.com/upwork" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              className="bg-yellow-400 text-blue-900 border-yellow-500 font-medium hover:bg-yellow-300 hover:text-blue-800"
            >
              Need a Developer? Work with Me!
            </Button>
          </a>
        </div>
      </div>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-2 top-2 text-white hover:text-gray-200"
        aria-label="Close banner"
      >
        <X size={20} />
      </button>
    </div>
  );
}