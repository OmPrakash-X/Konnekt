// pages/expert/ExpertDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Users,
    Calendar, 
    Award,
    Plus,
    Star,
    DollarSign,
    Clock,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import { useAppSelector } from '../../redux/hooks';
import Container from '../../components/layout/Container';

const ExpertDashboard: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const stats = [
        {
            icon: Users,
            label: 'Total Students',
            value: '45',
            change: '+12%',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-500/10 to-cyan-500/10',
        },
        {
            icon: Calendar,
            label: 'Sessions Completed',
            value: '128',
            change: '+8%',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-500/10 to-pink-500/10',
        },
        {
            icon: Star,
            label: 'Average Rating',
            value: '4.8',
            change: '+0.3',
            color: 'from-amber-500 to-orange-500',
            bgColor: 'from-amber-500/10 to-orange-500/10',
        },
        {
            icon: DollarSign,
            label: 'Total Earnings',
            value: '$2,450',
            change: '+15%',
            color: 'from-emerald-500 to-teal-500',
            bgColor: 'from-emerald-500/10 to-teal-500/10',
        },
    ];

    const quickActions = [
        {
            icon: BookOpen,
            title: 'My Skills',
            description: 'View and manage your expertise areas',
            path: '/skills/my-skills',
            color: 'from-[#32b8c6] to-[#2a9fac]',
            bgColor: 'from-[#32b8c6]/10 to-[#2a9fac]/10',
            borderColor: 'border-[#32b8c6]/30',
        },
        {
            icon: Plus,
            title: 'Add New Skill',
            description: 'Expand your teaching portfolio',
            path: '/skills/add',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-500/10 to-pink-500/10',
            borderColor: 'border-purple-500/30',
        },
        {
            icon: Award,
            title: 'Become Expert',
            description: 'Apply for expert verification',
            path: '/become-expert',
            color: 'from-amber-500 to-orange-500',
            bgColor: 'from-amber-500/10 to-orange-500/10',
            borderColor: 'border-amber-500/30',
        },
    ];

    const recentSessions = [
        {
            student: 'John Doe',
            skill: 'React Development',
            date: '2 hours ago',
            status: 'completed',
        },
        {
            student: 'Jane Smith',
            skill: 'UI/UX Design',
            date: '5 hours ago',
            status: 'completed',
        },
        {
            student: 'Mike Johnson',
            skill: 'Node.js Backend',
            date: 'Tomorrow at 2:00 PM',
            status: 'upcoming',
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Container>
                <div className="py-12 space-y-8">
                    {/* Welcome Section */}
                    <div className="relative overflow-hidden backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-linear-to-r from-[#32b8c6]/20 to-[#3dcad9]/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-[#32b8c6] to-[#3dcad9]">{user?.name}!</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl">
                                Manage your expertise, track your sessions, and grow your teaching career.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-linear-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-emerald-400 text-sm font-semibold">
                                                {stat.change}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={index}
                                        to={action.path}
                                        className="group relative backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                                    >
                                        <div className={`absolute inset-0 bg-linear-to-br ${action.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                        <div className="relative z-10">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${action.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                                                {action.title}
                                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            </h3>
                                            <p className="text-gray-400">{action.description}</p>
                                        </div>

                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Sessions */}
                    <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Recent Sessions</h2>
                            <Link
                                to="/sessions/my-sessions"
                                className="text-[#32b8c6] hover:text-[#3dcad9] font-semibold flex items-center gap-2 transition-colors"
                            >
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentSessions.map((session, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#32b8c6] to-[#2a9fac] flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{session.student}</p>
                                            <p className="text-gray-400 text-sm">{session.skill}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-gray-400 text-sm">{session.date}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {session.status === 'completed' ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                        <span className="text-emerald-400 text-sm font-medium">Completed</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clock className="w-4 h-4 text-amber-400" />
                                                        <span className="text-amber-400 text-sm font-medium">Upcoming</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">This Week</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Sessions Scheduled</span>
                                    <span className="text-white font-semibold">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Hours Taught</span>
                                    <span className="text-white font-semibold">18.5h</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">New Students</span>
                                    <span className="text-white font-semibold">5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Earnings</span>
                                    <span className="text-emerald-400 font-semibold">$480</span>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Top Skills</h3>
                            <div className="space-y-4">
                                {['React Development', 'UI/UX Design', 'Node.js Backend', 'TypeScript'].map((skill, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-300">{skill}</span>
                                            <span className="text-[#32b8c6] font-semibold">{95 - index * 10}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-[#32b8c6] to-[#3dcad9] rounded-full"
                                                style={{ width: `${95 - index * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ExpertDashboard;
