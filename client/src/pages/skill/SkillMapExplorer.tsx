import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import MapComponent from '../../components/common/MapComponent';
import axios from 'axios';

// Skill categories with colors
const SKILL_CATEGORIES = [
  { name: 'JavaScript', color: '#F7DF1E', icon: '⚡' },
  { name: 'Python', color: '#3776AB', icon: '🐍' },
  { name: 'React', color: '#61DAFB', icon: '⚛️' },
  { name: 'Node.js', color: '#339933', icon: '🟢' },
  { name: 'Photography', color: '#FF6B6B', icon: '📸' },
  { name: 'Guitar', color: '#FF8C42', icon: '🎸' },
  { name: 'Yoga', color: '#9B59B6', icon: '🧘' },
  { name: 'Cooking', color: '#E74C3C', icon: '👨‍🍳' },
  { name: 'Web Design', color: '#16A085', icon: '🎨' },
  { name: 'Data Science', color: '#2ECC71', icon: '📊' }
];

// Comprehensive mock data with various distances
const ALL_MOCK_USERS = [
  {
    _id: "user_1",
    name: "Arjun Patel",
    email: "arjun@example.com",
    bio: "Full-stack developer with 5 years of experience. Love teaching React and Node.js!",
    profilePicture: null,
    skills: [{ name: "JavaScript", level: "Expert" }, { name: "React", level: "Expert" }],
    location: { coordinates: [85.8250, 20.2965], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "0.05",
    primarySkillColor: "#F7DF1E",
    isOnline: true,
    averageRating: 4.9,
    completedSessions: 78,
    totalReviews: 45
  },
  {
    _id: "user_2",
    name: "Priya Sharma",
    email: "priya@example.com",
    bio: "Data scientist passionate about AI/ML. Also love photography!",
    profilePicture: null,
    skills: [{ name: "Python", level: "Expert" }, { name: "Data Science", level: "Expert" }],
    location: { coordinates: [85.8235, 20.2970], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "0.15",
    primarySkillColor: "#3776AB",
    isOnline: true,
    averageRating: 5.0,
    completedSessions: 92,
    totalReviews: 67
  },
  {
    _id: "user_3",
    name: "Sanjay Kumar",
    email: "sanjay@example.com",
    bio: "Professional photographer with 10+ years experience.",
    profilePicture: null,
    skills: [{ name: "Photography", level: "Expert" }],
    location: { coordinates: [85.8260, 20.2955], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "0.20",
    primarySkillColor: "#FF6B6B",
    isOnline: false,
    averageRating: 4.8,
    completedSessions: 156,
    totalReviews: 89
  },
  {
    _id: "user_4",
    name: "Neha Reddy",
    email: "neha@example.com",
    bio: "React Native developer and yoga instructor.",
    profilePicture: null,
    skills: [{ name: "React", level: "Expert" }, { name: "Yoga", level: "Advanced" }],
    location: { coordinates: [85.8345, 20.3061], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "1.5",
    primarySkillColor: "#61DAFB",
    isOnline: true,
    averageRating: 4.7,
    completedSessions: 34,
    totalReviews: 23
  },
  {
    _id: "user_5",
    name: "Rahul Mishra",
    email: "rahul@example.com",
    bio: "Professional guitarist and music teacher.",
    profilePicture: null,
    skills: [{ name: "Guitar", level: "Expert" }],
    location: { coordinates: [85.8145, 20.2861], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "2.3",
    primarySkillColor: "#FF8C42",
    isOnline: false,
    averageRating: 4.9,
    completedSessions: 67,
    totalReviews: 41
  },
  {
    _id: "user_6",
    name: "Divya Singh",
    email: "divya@example.com",
    bio: "Backend developer specializing in Node.js.",
    profilePicture: null,
    skills: [{ name: "Node.js", level: "Expert" }],
    location: { coordinates: [85.8395, 20.3011], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "3.1",
    primarySkillColor: "#339933",
    isOnline: true,
    averageRating: 4.6,
    completedSessions: 45,
    totalReviews: 28
  },
  {
    _id: "user_7",
    name: "Vikram Rao",
    email: "vikram@example.com",
    bio: "UI/UX designer and web design instructor.",
    profilePicture: null,
    skills: [{ name: "Web Design", level: "Expert" }],
    location: { coordinates: [85.8095, 20.2811], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "4.8",
    primarySkillColor: "#16A085",
    isOnline: true,
    averageRating: 4.8,
    completedSessions: 89,
    totalReviews: 52
  },
  {
    _id: "user_8",
    name: "Anjali Gupta",
    email: "anjali@example.com",
    bio: "Chef and cooking instructor.",
    profilePicture: null,
    skills: [{ name: "Cooking", level: "Expert" }],
    location: { coordinates: [85.8545, 20.3211], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "6.2",
    primarySkillColor: "#E74C3C",
    isOnline: false,
    averageRating: 5.0,
    completedSessions: 123,
    totalReviews: 98
  },
  {
    _id: "user_9",
    name: "Karan Mehta",
    email: "karan@example.com",
    bio: "Python automation expert.",
    profilePicture: null,
    skills: [{ name: "Python", level: "Expert" }],
    location: { coordinates: [85.7945, 20.2661], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "7.8",
    primarySkillColor: "#3776AB",
    isOnline: true,
    averageRating: 4.7,
    completedSessions: 56,
    totalReviews: 34
  },
  {
    _id: "user_10",
    name: "Meera Iyer",
    email: "meera@example.com",
    bio: "Certified yoga instructor.",
    profilePicture: null,
    skills: [{ name: "Yoga", level: "Expert" }],
    location: { coordinates: [85.8645, 20.3311], city: "Bhubaneswar", state: "Odisha" },
    distanceInKm: "9.5",
    primarySkillColor: "#9B59B6",
    isOnline: true,
    averageRating: 4.9,
    completedSessions: 234,
    totalReviews: 156
  }
];

const SkillsMapExplorer: React.FC = () => {
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
  const [radius, setRadius] = useState(5000);
  const [userLocation, setUserLocation] = useState<{ longitude: number; latitude: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [useMockData, setUseMockData] = useState(true);
  const fetchingRef = useRef(false);

  // Get user's current location - ONLY ONCE
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation({ longitude: 85.8245, latitude: 20.2961 });
        }
      );
    } else {
      setUserLocation({ longitude: 85.8245, latitude: 20.2961 });
    }
  }, []);

  // Fetch function - NOT in useCallback to avoid dependency issues
  const fetchNearbyUsers = async () => {
    if (!userLocation || fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const radiusInKm = radius / 1000;
        let filtered = ALL_MOCK_USERS.filter(user => {
          const distance = parseFloat(user.distanceInKm);
          return distance <= radiusInKm;
        });

        if (selectedSkill) {
          filtered = filtered.filter(user =>
            user.skills.some(skill => skill.name === selectedSkill)
          );
        }

        setNearbyUsers(filtered);
      } else {
        const params: any = {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
          radius: radius,
          limit: 50
        };

        if (selectedSkill) {
          params.skillName = selectedSkill;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/nearby`,
          { params }
        );

        setNearbyUsers(response.data.users || []);
      }
    } catch (error: any) {
      console.error('❌ Error:', error);
      setError(error.response?.data?.message || 'Failed to fetch nearby users');
      setNearbyUsers([]);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  // CRITICAL FIX: Only primitive dependencies, NOT the fetch function
  useEffect(() => {
    if (!userLocation) return;

    const debounceTimer = setTimeout(() => {
      fetchNearbyUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [userLocation?.longitude, userLocation?.latitude, radius, selectedSkill, useMockData]);

  const handleUserMarkerClick = useCallback((user: any) => {
    setSelectedUser(user);
  }, []);

  const handleSkillFilter = useCallback((skillName: string) => {
    setSelectedSkill(prev => prev === skillName ? '' : skillName);
  }, []);

  const memoizedUserLocation = useMemo(() => {
    if (!userLocation) return null;
    return userLocation;
  }, [userLocation?.longitude, userLocation?.latitude]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20">
            <span className="text-cyan-400 text-sm font-medium">🗺️ Explore Skills Near You</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Discover talented individuals
            </span>
            <br />
            <span className="text-white">in your area</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect for skill exchange through personalized 1-on-1 sessions
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* Skill Filter Pills */}
        <div className="max-w-6xl mx-auto mb-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h3 className="text-sm font-semibold text-cyan-400 mb-4">Filter by Skill:</h3>
          <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.map((skill) => (
              <button
                key={skill.name}
                onClick={() => handleSkillFilter(skill.name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedSkill === skill.name
                    ? 'scale-105 shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
                style={{
                  backgroundColor: selectedSkill === skill.name ? skill.color : undefined,
                  color: selectedSkill === skill.name ? 'white' : undefined
                }}
              >
                <span className="mr-2">{skill.icon}</span>
                {skill.name}
              </button>
            ))}
            {selectedSkill && (
              <button
                onClick={() => setSelectedSkill('')}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-6xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Radius Control */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <label className="block text-sm font-semibold text-cyan-400 mb-3">
              Search Radius: <span className="text-white">{(radius / 1000).toFixed(1)} km</span>
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-cyan"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1 km</span>
              <span>20 km</span>
            </div>
          </div>

          {/* Demo Mode Toggle */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <span className="mr-3 text-sm font-semibold text-cyan-400">Demo Mode:</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={useMockData}
                  onChange={(e) => setUseMockData(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full transition-all ${useMockData ? 'bg-linear-to-r from-cyan-500 to-blue-500' : 'bg-white/10'}`}>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform shadow-lg ${useMockData ? 'transform translate-x-6' : ''}`}></div>
                </div>
              </div>
              <span className={`ml-3 text-sm font-medium ${useMockData ? 'text-cyan-400' : 'text-gray-500'}`}>
                {useMockData ? 'ON' : 'OFF'}
              </span>
            </label>
          </div>

          {/* Results Count */}
          <div className="p-5 rounded-2xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/30 shadow-xl">
            <p className="text-xs text-gray-400 mb-1">Found</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              {nearbyUsers.length}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {selectedSkill ? `${selectedSkill} experts` : 'nearby users'}
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="max-w-6xl mx-auto mb-6 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              {useMockData ? (
                <>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Showing demo data
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Using real database
                </>
              )}
            </p>
            <button
              onClick={fetchNearbyUsers}
              disabled={loading}
              className="px-5 py-2 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
          </div>

          {memoizedUserLocation ? (
            <div className="rounded-xl overflow-hidden">
              <MapComponent
                nearbyUsers={nearbyUsers}
                userLocation={memoizedUserLocation}
                onUserMarkerClick={handleUserMarkerClick}
                height="500px"
                zoom={13}
              />
            </div>
          ) : (
            <div className="h-[500px] bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-400">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {/* User List */}
        <div className="max-w-6xl mx-auto p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Nearby Users {selectedSkill && `- ${selectedSkill}`}
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : nearbyUsers.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <p className="text-xl font-semibold text-gray-300 mb-2">No users found</p>
              <p className="text-sm text-gray-400">
                {selectedSkill ? `Try clearing the "${selectedSkill}" filter` : 'Try increasing the radius or enabling demo mode'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={user.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2"
                        style={{ borderColor: user.primarySkillColor }}
                      />
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{user.name}</h3>
                      <p className="text-xs text-gray-400">{user.location?.city}</p>
                    </div>
                    {user.averageRating && (
                      <div className="px-2 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                        <span className="text-yellow-400 text-xs font-bold">⭐ {user.averageRating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.skills?.slice(0, 2).map((skill: any, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-lg font-medium border"
                        style={{
                          backgroundColor: idx === 0 ? `${user.primarySkillColor}30` : 'rgba(255,255,255,0.05)',
                          color: idx === 0 ? user.primarySkillColor : '#9CA3AF',
                          borderColor: idx === 0 ? `${user.primarySkillColor}50` : 'rgba(255,255,255,0.1)'
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <span className="text-cyan-400">📍</span>
                      <span className="text-white font-medium">{user.distanceInKm} km</span>
                    </span>
                    <span className="text-white font-medium">{user.completedSessions || 0} sessions</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedUser.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                    alt={selectedUser.name}
                    className="w-16 h-16 rounded-full border-4"
                    style={{ borderColor: selectedUser.primarySkillColor }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
                    <p className="text-gray-400">{selectedUser.email}</p>
                    <p className="text-sm text-cyan-400 mt-1">
                      {selectedUser.location?.city}, {selectedUser.location?.state}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-white text-3xl font-bold transition"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {selectedUser.bio && (
                <div className="mb-4">
                  <h3 className="text-cyan-400 font-semibold mb-2">Bio</h3>
                  <p className="text-gray-300">{selectedUser.bio}</p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-cyan-400 font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.skills?.map((skill: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-2 rounded-lg font-medium border"
                      style={{
                        backgroundColor: idx === 0 ? `${selectedUser.primarySkillColor}40` : 'rgba(255,255,255,0.05)',
                        color: idx === 0 ? selectedUser.primarySkillColor : '#9CA3AF',
                        borderColor: idx === 0 ? `${selectedUser.primarySkillColor}60` : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {skill.name} - {skill.level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Distance</p>
                  <p className="text-xl font-bold text-cyan-400">{selectedUser.distanceInKm} km</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Sessions</p>
                  <p className="text-xl font-bold text-white">{selectedUser.completedSessions || 0}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-xl font-bold text-yellow-400">⭐ {selectedUser.averageRating}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Reviews</p>
                  <p className="text-xl font-bold text-white">{selectedUser.totalReviews || 0}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl font-semibold bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50">
                  💬 Message
                </button>
                <button className="flex-1 py-3 rounded-xl font-semibold bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50">
                  📅 Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsMapExplorer;
