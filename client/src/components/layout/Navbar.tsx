import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, Settings, Bell } from 'lucide-react';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/authSlice';
import { toggleTheme } from '../../redux/features/themeSlice';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { mode } = useAppSelector((state) => state.theme);


    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const userMenuItems = [
        {
            label: 'Profile',
            onClick: () => navigate('/profile'),
            icon: <User className="w-4 h-4" />,
        },
        {
            label: 'Settings',
            onClick: () => navigate('/settings'),
            icon: <Settings className="w-4 h-4" />,
        },
        {
            label: 'Logout',
            onClick: handleLogout,
            icon: <LogOut className="w-4 h-4" />,
            danger: true,
        },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#32b8c6] to-[#2a9fac] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">K</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            Konnekt
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/explore"
                            className="text-gray-700 dark:text-gray-300 hover:text-[#32b8c6] dark:hover:text-[#32b8c6] transition-colors"
                        >
                            Explore Skills
                        </Link>
                        <Link
                            to="/experts"
                            className="text-gray-700 dark:text-gray-300 hover:text-[#32b8c6] dark:hover:text-[#32b8c6] transition-colors"
                        >
                            Find Experts
                        </Link>
                        <Link
                            to="/sessions"
                            className="text-gray-700 dark:text-gray-300 hover:text-[#32b8c6] dark:hover:text-[#32b8c6] transition-colors"
                        >
                            My Sessions
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {mode ? (
                                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>

                        {isAuthenticated ? (
                            <>
                                {/* Notifications */}
                                <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* User Menu */}
                                <Dropdown
                                    trigger={<Avatar src={user?.avatar} fallback={user?.name} size="sm" />}
                                    items={userMenuItems}
                                />
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-[#32b8c6] transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-[#32b8c6] hover:bg-[#2a9fac] text-white rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col gap-3">
                            <Link
                                to="/explore"
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Explore Skills
                            </Link>
                            <Link
                                to="/experts"
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Find Experts
                            </Link>
                            <Link
                                to="/sessions"
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                My Sessions
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
