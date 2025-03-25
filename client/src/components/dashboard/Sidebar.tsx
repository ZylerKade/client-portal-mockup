import { Section } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  isMobileOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, isMobileOpen, toggleMobileMenu }: SidebarProps) {
  const { user, logout } = useAuth();

  const navItems: { label: string; section: Section; icon: string }[] = [
    { label: "Overview", section: "overview", icon: "ri-dashboard-line" },
    { label: "Files", section: "files", icon: "ri-file-list-line" },
    { label: "Messages", section: "messages", icon: "ri-message-3-line" },
    { label: "Notes", section: "notes", icon: "ri-sticky-note-line" },
  ];

  return (
    <aside className="bg-slate-900 text-white w-full md:w-64 md:min-h-screen flex-shrink-0">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary rounded flex items-center justify-center mr-2">
            <i className="ri-dashboard-fill"></i>
          </div>
          <span className="font-semibold">Client Dashboard</span>
        </div>
        <button className="text-white" onClick={toggleMobileMenu}>
          <i className={`${isMobileOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700 hidden md:block">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center mr-2">
              <i className="ri-dashboard-fill"></i>
            </div>
            <span className="font-semibold">Client Dashboard</span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center mr-3">
              <i className="ri-user-fill text-xl"></i>
            </div>
            <div>
              <p className="font-medium">{user?.name || 'User'}</p>
              <p className="text-slate-400 text-sm">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <p className="px-4 text-xs text-slate-400 font-medium mb-2 uppercase">Main</p>
          <ul>
            {navItems.map((item) => (
              <li key={item.section}>
                <button 
                  className={`w-full px-4 py-2 flex items-center text-left ${
                    activeSection === item.section 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 rounded-md'
                  }`} 
                  onClick={() => onSectionChange(item.section)}
                >
                  <i className={`${item.icon} mr-3`}></i>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="px-4 text-xs text-slate-400 font-medium mt-6 mb-2 uppercase">Account</p>
          <ul>
            <li>
              <button 
                className="w-full px-4 py-2 flex items-center text-left text-slate-300 hover:bg-slate-800 rounded-md"
                onClick={() => onSectionChange("settings")}
              >
                <i className="ri-settings-3-line mr-3"></i>
                <span>Settings</span>
              </button>
            </li>
            <li>
              <button 
                className="w-full px-4 py-2 flex items-center text-left text-slate-300 hover:bg-slate-800 rounded-md"
                onClick={() => {
                  // Clear auth state in localStorage directly
                  console.log("Sign out clicked");
                  localStorage.removeItem("isAuthenticated");
                  localStorage.removeItem("user");
                  
                  // Call context logout for compatibility
                  if (logout) logout();
                  
                  // Force redirect to login page
                  console.log("Redirecting to login page...");
                  window.location.href = "/";
                }}
              >
                <i className="ri-logout-box-line mr-3"></i>
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
