interface DashboardHeaderProps {
  title: string;
  toggleSidebar: () => void;
}

export default function DashboardHeader({ title, toggleSidebar }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100">
            <i className="ri-notification-3-line"></i>
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100">
            <i className="ri-settings-3-line"></i>
          </button>
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center md:hidden">
            <i className="ri-user-fill text-slate-700"></i>
          </div>
        </div>
      </div>
    </header>
  );
}
