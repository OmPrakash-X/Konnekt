import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Shield, Sparkles } from 'lucide-react';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/authSlice';
import KonnektLogo from '../../assets/images/KonnektLogo.png';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleProfileClick = () => {
    // Navigate to own profile using user's ID
    const userId = user?.id || user?._id;
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      navigate('/profile');
    }
  };

  const userMenuItems = [
    {
      label: 'Profile',
      onClick: handleProfileClick,
      icon: <User className="w-4 h-4" />,
    },
    {
      label: 'Settings',
      onClick: () => navigate('/settings'),
      icon: <Settings className="w-4 h-4" />,
    },
    ...(user?.role === 'admin'
      ? [
          {
            label: 'Admin Dashboard',
            onClick: () => navigate('/admin'),
            icon: <Shield className="w-4 h-4" />,
          },
        ]
      : []),
    {
      label: 'Logout',
      onClick: handleLogout,
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
    },
  ];

  return (
    <>
      {/* Navbar with Enhanced Glass Effect */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Glow */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Animated glow */}
                <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6] via-purple-500 to-pink-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse" />

                {/* Logo container */}
                <div className="relative w-12 h-12 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={KonnektLogo}
                    alt="Konnekt"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6]/20 to-purple-500/20" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-linear-to-r from-[#32b8c6] via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Konnekt
                </span>
                <span className="text-[10px] text-gray-500 -mt-1">Connect & Learn</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/skills" icon={<Sparkles className="w-4 h-4" />}>
                Explore Skills
              </NavLink>
              <NavLink to="/experts">Find Experts</NavLink>
              <NavLink to="/sessions/my-sessions">My Sessions</NavLink>

              {/* Admin Badge - Only for admins */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="group relative px-4 py-2 rounded-xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-300 flex items-center gap-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/20 group-hover:to-orange-500/20 transition-all duration-300" />
                  <Shield className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 font-medium">Admin</span>
                </Link>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative group">
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

                  <Dropdown
                    trigger={
                      <div className="relative cursor-pointer">
                        <div className="p-2 rounded-full ">
                          <Avatar src={user?.avatar} fallback={user?.name} size="md" />
                        </div>
                      </div>
                    }
                    items={userMenuItems}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-300 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="group relative px-5 py-2 rounded-xl bg-linear-to-r from-[#32b8c6] to-purple-500 text-white font-semibold shadow-lg shadow-[#32b8c6]/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      Sign Up
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col gap-2">
                <MobileNavLink to="/skills" onClick={() => setIsMobileMenuOpen(false)}>
                  Explore Skills
                </MobileNavLink>
                <MobileNavLink to="/experts" onClick={() => setIsMobileMenuOpen(false)}>
                  Find Experts
                </MobileNavLink>
                <MobileNavLink to="/sessions/my-sessions" onClick={() => setIsMobileMenuOpen(false)}>
                  My Sessions
                </MobileNavLink>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-3 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-400 hover:text-amber-300 rounded-xl transition-all duration-300 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                )}

                {!isAuthenticated && (
                  <>
                    <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent my-2" />
                    <Link
                      to="/login"
                      className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-3 bg-linear-to-r from-[#32b8c6] to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-[#32b8c6]/30 hover:shadow-xl transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Background linear */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>
    </>
  );
};

// Helper Components
const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ to, children, icon }) => (
  <Link
    to={to}
    className="group relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-xl transition-all duration-300" />
    <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6]/0 to-purple-500/0 group-hover:from-[#32b8c6]/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300" />
    <span className="relative z-10 flex items-center gap-2 font-medium">
      {icon}
      {children}
    </span>
  </Link>
);

const MobileNavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-xl transition-all duration-300 font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
