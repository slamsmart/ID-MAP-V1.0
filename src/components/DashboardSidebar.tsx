import { type ReactNode, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
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
  const { signOut } = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      // Clerk not configured
    }
    navigate('/');
  };

  const sidebarContent = (
    <>
      <div className="p-5 pb-3">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Logo variant="light" subtitle={subtitles[variant]} />
        </Link>
      </div>

      <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.href ? location.pathname === item.href : false;
          return (
            <Link
              key={item.label}
              to={item.href || '#'}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-mangrove-neon text-mangrove-deep shadow-md shadow-mangrove-neon/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
        <p className="text-[10px] text-gray-500 px-1">© 2024 ID-MAP</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-50 lg:hidden w-10 h-10 bg-mangrove-deep rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-gradient-to-b from-mangrove-deep to-mangrove-teal flex flex-col">
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
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 bg-gradient-to-b from-mangrove-deep to-mangrove-teal flex-col z-40">
        {sidebarContent}
      </aside>
    </>
  );
}
