import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Layout
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

// User Pages
import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import EditProfile from '../pages/user/EditProfile';
import Settings from '../pages/user/Settings';
import Wallet from '../pages/user/Wallet';

// Expert Pages
import ExpertsList from '../pages/expert/ExpertsList';
import ExpertProfile from '../pages/expert/ExpertProfile';
import BecomeExpert from '../pages/expert/BecomeExpert';

// Skill Pages
import SkillsExplore from '../pages/skill/SkillsExplore';
import SkillDetails from '../pages/skill/SkillDetails';
import MySkills from '../pages/skill/MySkills';
import AddSkill from '../pages/skill/AddSkill';

// Session Pages
import MySessions from '../pages/session/MySessions';
import SessionDetails from '../pages/session/SessionDetails';
import BookSession from '../pages/session/BookSession';
import SessionHistory from '../pages/session/SessionHistory';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageBadges from '../pages/admin/ManageBadges';
import VerifySkills from '../pages/admin/VerifySkills';
import PlatformStats from '../pages/admin/PlatformStats';
import SkillsMapExplorer from '../components/skill/SkillsMapExplorer';
import MapDemo from '../pages/MapDemo';


const AppRoutes: React.FC = () => {
  return (
    <>
       <Navbar />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Public Expert/Skill Routes */}
          <Route path="/experts" element={<ExpertsList />} />
          <Route path="/experts/:expertId" element={<ExpertProfile />} />
          <Route path="/skills" element={<SkillsExplore />} />
          <Route path="/skills/:skillId" element={<SkillDetails />} />
          <Route path="/explore-map" element={<SkillsMapExplorer />} />
          <Route path="/map-demo" element={<MapDemo />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* User Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wallet" element={<Wallet />} />

            {/* Expert Routes */}
            <Route path="/become-expert" element={<BecomeExpert />} />
            <Route path="/skills/my-skills" element={<MySkills />} />
            <Route path="/skills/add" element={<AddSkill />} />

            {/* Session Routes */}
            <Route path="/sessions/my-sessions" element={<MySessions />} />
            <Route path="/sessions/:sessionId" element={<SessionDetails />} />
            <Route path="/sessions/book" element={<BookSession />} />
            <Route path="/sessions/history" element={<SessionHistory />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/badges" element={<ManageBadges />} />
            <Route path="/admin/verify-skills" element={<VerifySkills />} />
            <Route path="/admin/stats" element={<PlatformStats />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
