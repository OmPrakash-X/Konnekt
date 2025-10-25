import React, { useState } from 'react';
import { User, Mail, MapPin, FileText, Camera } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

interface EditProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    location?: string;
  };
  onSave: (data: any) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
    location: user.location || '',
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave({ ...formData, avatar: avatarPreview });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Glass Container */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* linear Accent */}
          <div className="absolute inset-0 bg-linear-to-br from-[#32b8c6]/10 via-transparent to-purple-500/10 pointer-events-none" />
          
          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
              <p className="text-gray-400">Update your personal information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-linear-to-r from-[#32b8c6] to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative">
                    <Avatar src={avatarPreview} fallback={formData.name} size="xl" />
                    <label
                      htmlFor="avatar-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
                    >
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-white mx-auto mb-1" />
                        <span className="text-xs text-white font-medium">Change Photo</span>
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  Click to upload new photo
                </p>
              </div>

              {/* Form Fields with Glass Effect */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-[#32b8c6]" />
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]/50 focus:border-[#32b8c6]/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2 text-[#32b8c6]" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 cursor-not-allowed"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2 text-[#32b8c6]" />
                    Location
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]/50 focus:border-[#32b8c6]/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-2 text-[#32b8c6]" />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]/50 focus:border-[#32b8c6]/50 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 relative group overflow-hidden px-6 py-3 rounded-xl bg-linear-to-r from-[#32b8c6] to-[#28a0ad] text-white font-semibold shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10">
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#28a0ad] to-[#32b8c6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#32b8c6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
};

export default EditProfile;
