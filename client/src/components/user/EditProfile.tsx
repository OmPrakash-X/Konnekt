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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Upload */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <Avatar src={avatarPreview} fallback={formData.name} size="xl" />
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            <Camera className="w-8 h-8 text-white" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Click to upload new photo
        </p>
      </div>

      {/* Form Fields */}
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        icon={<User className="w-5 h-5" />}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        icon={<Mail className="w-5 h-5" />}
        disabled
        helperText="Email cannot be changed"
      />

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        icon={<MapPin className="w-5 h-5" />}
        placeholder="City, Country"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <FileText className="w-4 h-4 inline mr-2" />
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32b8c6] focus:border-transparent"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" fullWidth isLoading={isLoading}>
          Save Changes
        </Button>
        <Button type="button" variant="outline" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
