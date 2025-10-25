import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMyProfile, updateProfile } from '../../redux/features/userSlice';
import EditProfileComponent from '../../components/user/EditProfile';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const handleSave = async (data: any) => {
    try {
      await dispatch(updateProfile(data)).unwrap();
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Container>
      <div className="py-12">
        <EditProfileComponent
          user={{
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar,
            bio: profile.bio,
            location: profile.location,
          }}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </Container>
  );
};

export default EditProfile;
