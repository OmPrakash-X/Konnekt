import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Award,
  BarChart3,
  Shield,
  X,
  Menu,
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Award, label: 'Badge Management', path: '/admin/badges' },
    { icon: Shield, label: 'Verify Skills', path: '/admin/verify-skills' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/stats' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Floating Bottom Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-linear-to-r from-[#32b8c6] to-purple-500 text-white rounded-full shadow-2xl shadow-[#32b8c6]/50 hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 min-h-screen p-6
          bg-black/40 backdrop-blur-xl border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header with Glass Effect */}
        <div className="mb-8 mt-16 lg:mt-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h2 className="text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-400 mt-1">Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active
                    ? 'bg-linear-to-r from-[#32b8c6]/20 to-purple-500/20 text-white border border-[#32b8c6]/30 shadow-lg shadow-[#32b8c6]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                {/* Glow effect for active item */}
                {active && (
                  <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-xl blur-xl opacity-20" />
                )}

                {/* Icon */}
                <Icon
                  className={`relative w-5 h-5 transition-transform duration-300 ${
                    active ? 'text-[#32b8c6]' : 'group-hover:scale-110'
                  }`}
                />

                {/* Label */}
                <span className="relative font-medium">{item.label}</span>

                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-[#32b8c6] to-purple-500 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Decoration */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Konnekt Admin v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
