import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Bell } from 'lucide-react';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/authSlice';


const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { mode } = useAppSelector((state) => state.theme);

    // Apply theme to document root
    useEffect(() => {
        const root = document.documentElement;
        if (mode === 'dark') {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
    }, [mode]);

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
        <>
            {/* Navbar with Glass Effect */}
            <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6] to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative w-12 h-12  rounded-xl flex items-center justify-center shadow-lg">

                                    <img src="./KonnektLogo.png" alt="KonnektLogo" className='w-full h-full object-cover' />

                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Konnekt
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                to="/skills"
                                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                Explore Skills
                            </Link>
                            <Link
                                to="/experts"
                                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                Find Experts
                            </Link>
                            <Link
                                to="/sessions/my-sessions"
                                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                My Sessions
                            </Link>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">


                            {isAuthenticated ? (
                                <>
                                    {/* Notifications */}
                                    <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                                        <Bell className="w-5 h-5 text-gray-300" />
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-linear-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></span>
                                    </button>

                                    {/* User Menu */}
                                    <div className="relative">
                                        <Dropdown
                                            trigger={
                                                <div className="relative group cursor-pointer">
                                                    <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-full blur-sm opacity-0 group-hover:opacity-75 transition-opacity" />
                                                    <Avatar src={user?.avatar} fallback={user?.name} size="sm" />
                                                </div>
                                            }
                                            items={userMenuItems}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="relative group px-5 py-2 rounded-lg bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white font-medium shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        <span className="relative z-10">Sign Up</span>
                                        <div className="absolute inset-0 bg-linear-to-r from-[#2a9fac] to-[#32b8c6] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
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
                                <Link
                                    to="/explore"
                                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Explore Skills
                                </Link>
                                <Link
                                    to="/experts"
                                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Find Experts
                                </Link>
                                <Link
                                    to="/sessions"
                                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Sessions
                                </Link>

                                {!isAuthenticated && (
                                    <>
                                        <div className="h-px bg-white/10 my-2" />
                                        <Link
                                            to="/login"
                                            className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="px-4 py-3 bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white font-medium rounded-lg shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300"
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
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
        </>
    );
};

export default Navbar;
