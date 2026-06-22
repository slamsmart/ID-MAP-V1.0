import { Search, Bell } from 'lucide-react';

interface DashboardTopbarProps {
  placeholder?: string;
  userName: string;
  userRole?: string;
  userAvatar?: string;
}

export default function DashboardTopbar({ placeholder = 'Cari...', userName, userRole }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-100/80 px-4 lg:px-6 py-2.5 flex items-center justify-between gap-3">
      <div className="relative flex-1 max-w-sm ml-10 lg:ml-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2 bg-gray-50/80 border border-gray-200/60 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/20 focus:border-mangrove-fresh transition-all"
        />
      </div>
      <div className="flex items-center gap-1.5 lg:gap-2">
        <button className="relative p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <Bell className="w-4 h-4 text-gray-400" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-mangrove-fresh rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-1.5 border-l border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center text-white text-[10px] font-bold">
            {userName.charAt(0)}
          </div>
          <div className="hidden md:block">
            <p className="text-[11px] font-semibold text-gray-700 leading-tight">{userName}</p>
            {userRole && <p className="text-[9px] text-gray-400 leading-tight">{userRole}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}
