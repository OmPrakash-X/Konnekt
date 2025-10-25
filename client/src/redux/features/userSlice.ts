import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "../../api/user.api";

interface UserProfile {
  id: string;
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string | { country?: string; city?: string; state?: string };
  role: string;
  joinedDate: string;
  createdAt?: string;
  rating?: number;
  totalReviews?: number;
  totalSessions?: number;
  expertIn?: string[];
  badges?: Array<{ id?: string; name: string; icon: string }>;
  stats?: any;
  isExpert?: boolean;
  
  // Additional properties to match auth.User
  averageRating?: number;
  completedSessions?: number;
  skills?: Array<string | { name: string; level?: string }>;
  learningNeeds?: string[];
  walletBalance?: number;
  totalEarnings?: number;
  totalSpent?: number;
  profileViews?: number;
  profileCompleteness?: number;
  isProfileComplete?: boolean;
  lastActive?: string;
  updatedAt?: string;
  accountStatus?: string;
  isEmailVerified?: boolean;
  __v?: number;
  passwordHash?: string;
  isVerified?: boolean;
  isOtpVerified?: boolean;
  
  expertProfile?: {
    isExpert: boolean;
    expertiseAreas?: string[];
    hourlyRate?: number;
    certificationDocuments?: string[];
  };
  
  preferences?: {
    sessionMode?: string[];
    maxDistance?: number;
  };
  
  availability?: {
    days?: string[];
    timezone?: string;
    timeSlots?: string[];
  };
  
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    newMessages?: boolean;
    sessionReminders?: boolean;
    reviewReceived?: boolean;
    creditsEarned?: boolean;
  };
  
  accessibility?: {
    highContrast?: boolean;
    voiceControl?: boolean;
    language?: string;
    fontSize?: string;
  };
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// Helper function to transform user data
const transformUserData = (userData: any): UserProfile => {
  return {
    ...userData,
    id: userData._id || userData.id,
    joinedDate: userData.createdAt || userData.joinedDate || new Date().toISOString(),
    isExpert: userData.expertProfile?.isExpert || userData.role === 'expert',
  };
};

// Get user profile by ID
export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      console.log('Fetching user profile for ID:', userId);
      const response = await userAPI.getUserProfile(userId);
      console.log('Raw response:', response.data);
      
      const userData = response.data.user || response.data;
      
      if (!userData) {
        throw new Error('No user data in response');
      }
      
      const transformedData = transformUserData(userData);
      console.log('Transformed data:', transformedData);
      
      return transformedData;
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch user profile');
    }
  }
);

// Get my profile
export const getMyProfile = createAsyncThunk(
  "user/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching my profile');
      const response = await userAPI.getMyProfile();
      const userData = response.data.user || response.data;
      
      if (!userData._id && !userData.id) {
        throw new Error('User data missing ID');
      }
      
      return transformUserData(userData);
    } catch (error: any) {
      console.error('Error fetching my profile:', error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    data: { name?: string; bio?: string; location?: string; avatar?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await userAPI.updateProfile(data);
      const userData = response.data.user || response.data;
      
      return transformUserData(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// Become expert
export const becomeExpert = createAsyncThunk(
  "user/becomeExpert",
  async (data: { skills: string[]; bio: string }, { rejectWithValue }) => {
    try {
      const response = await userAPI.becomeExpert(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to become expert');
    }
  }
);

// Search users
export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.searchUsers(query);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

// Get user stats
export const getUserStats = createAsyncThunk(
  "user/getUserStats",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserStats(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

// Get user reviews
export const getUserReviews = createAsyncThunk(
  "user/getUserReviews",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserReviews(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    // Get User Profile
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get My Profile
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Become Expert
    builder
      .addCase(becomeExpert.pending, (state) => {
        state.loading = true;
      })
      .addCase(becomeExpert.fulfilled, (state) => {
        state.loading = false;
        if (state.profile) {
          state.profile.role = "expert";
          state.profile.isExpert = true;
        }
      })
      .addCase(becomeExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // User Stats
    builder
      .addCase(getUserStats.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.stats = action.payload;
        }
      });
  },
});

export const { clearUserError, clearProfile } = userSlice.actions;
export default userSlice.reducer;
