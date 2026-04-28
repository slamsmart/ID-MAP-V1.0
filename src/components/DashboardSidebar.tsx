import { type ReactNode, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const sidebarContent = (
    <>
      <div className="p-5 pb-3">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Logo variant="light" subtitle={subtitles[variant]} />
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.href ? location.pathname === item.href : false;
          return (
            <Link
              key={item.label}
              to={item.href || '#'}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-mangrove-neon/90 text-mangrove-deep'
                  : 'text-gray-400 hover:bg-white/8 hover:text-gray-200'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-white/8 hover:text-gray-200 transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-2 left-2 z-50 lg:hidden w-9 h-9 bg-mangrove-deep/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-white shadow-md cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 h-full bg-gradient-to-b from-mangrove-deep to-mangrove-teal flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-mangrove-deep via-[#042724] to-mangrove-teal flex-col z-40">
        {sidebarContent}
      </aside>
    </>
  );
}
