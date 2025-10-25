import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMyProfile, updateProfile } from '../../redux/features/userSlice';
import EditProfileComponent from '../../components/user/EditProfile';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';
import { toast } from 'sonner';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get profile from user slice, fallback to auth.user
  const { profile, loading } = useAppSelector((state) => state.user);
  const currentUser = useAppSelector((state) => state.auth.user);
  
  // Use whichever is available
  const userProfile = profile || currentUser;

  useEffect(() => {
    if (!profile) {
      dispatch(getMyProfile());
    }
  }, [dispatch, profile]);

  // Helper function to format location
  const formatLocation = (location: string | { country?: string; city?: string; state?: string } | undefined): string => {
    if (!location) return '';
    
    if (typeof location === 'string') {
      return location;
    }
    
    // If location is an object, format it as a string
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (location.country) parts.push(location.country);
    
    return parts.join(', ');
  };

  const handleSave = async (data: any) => {
    try {
      await dispatch(updateProfile(data)).unwrap();
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading && !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Profile not found</h2>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gradient-to-r from-[#32b8c6] to-purple-500 text-white rounded-xl hover:scale-105 transition-transform"
            >
              Go to Dashboard
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#32b8c6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="py-12">
          <EditProfileComponent
            user={{
              name: userProfile.name,
              email: userProfile.email,
              avatar: userProfile.avatar,
              bio: userProfile.bio,
              location: formatLocation(userProfile.location), // Convert to string
            }}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </Container>
    </div>
  );
};

export default EditProfile;
