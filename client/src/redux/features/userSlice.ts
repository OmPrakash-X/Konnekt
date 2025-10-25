import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from '../../api/user.api';

// UPDATED Interface to match UserProfile component expectations
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  role: string;
  joinedDate: string; // ADD THIS
  rating?: number; // ADD THIS
  totalReviews?: number; // ADD THIS
  totalSessions?: number; // ADD THIS
  expertIn?: string[]; // ADD THIS
  badges?: Array<{ id: string; name: string; icon: string }>; // ADD THIS
  stats?: any;
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

// Get user profile by ID
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserProfile(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get my profile
export const getMyProfile = createAsyncThunk(
  'user/getMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getMyProfile();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: { name?: string; bio?: string; location?: string; avatar?: string }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfile(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Become expert
export const becomeExpert = createAsyncThunk(
  'user/becomeExpert',
  async (data: { skills: string[]; bio: string }, { rejectWithValue }) => {
    try {
      const response = await userAPI.becomeExpert(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Search users
export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.searchUsers(query);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get user stats
export const getUserStats = createAsyncThunk(
  'user/getUserStats',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserStats(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get user reviews
export const getUserReviews = createAsyncThunk(
  'user/getUserReviews',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserReviews(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
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
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get My Profile
    builder.addCase(getMyProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Profile
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    // Become Expert
    builder.addCase(becomeExpert.fulfilled, (state) => {
      if (state.profile) {
        state.profile.role = 'expert';
      }
    });
  },
});

export const { clearUserError, clearProfile } = userSlice.actions;
export default userSlice.reducer;
