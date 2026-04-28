import { type ReactNode } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from './Logo';

interface MenuItem {
  icon: ReactNode;
  label: string;
  href?: string;
}

interface DashboardSidebarProps {
  variant: 'admin' | 'verifikator' | 'user';
  menuItems: MenuItem[];
}

const subtitles = {
  admin: 'ADMIN',
  verifikator: 'VERIFIKATOR',
  user: 'USER',
};

export default function DashboardSidebar({ variant, menuItems }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-mangrove-deep to-mangrove-teal flex flex-col z-40">
      <div className="p-6 pb-4">
        <Link to="/">
          <Logo variant="light" subtitle={subtitles[variant]} />
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.href ? location.pathname === item.href : false;
          return (
            <Link
              key={item.label}
              to={item.href || '#'}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-mangrove-neon text-mangrove-deep shadow-lg shadow-mangrove-neon/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
        <p className="text-xs text-gray-400">© 2024 ID-MAP</p>
      </div>
    </aside>
  );
}
