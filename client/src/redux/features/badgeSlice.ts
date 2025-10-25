import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as badgeAPI from '../../api/badge.api';

interface BadgeState {
  badges: any[];
  myBadges: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BadgeState = {
  badges: [],
  myBadges: [],
  loading: false,
  error: null,
};

// Get all badges
export const getAllBadges = createAsyncThunk(
  'badge/getAllBadges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.getAllBadges();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get my badges
export const getMyBadges = createAsyncThunk(
  'badge/getMyBadges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.getMyBadges();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create badge (admin only)
export const createBadge = createAsyncThunk(
  'badge/createBadge',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.createBadge(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update badge (admin only)
export const updateBadge = createAsyncThunk(
  'badge/updateBadge',
  async ({ badgeId, data }: { badgeId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.updateBadge(badgeId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete badge (admin only)
export const deleteBadge = createAsyncThunk(
  'badge/deleteBadge',
  async (badgeId: string, { rejectWithValue }) => {
    try {
      await badgeAPI.deleteBadge(badgeId);
      return badgeId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    clearBadgeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Badges
    builder.addCase(getAllBadges.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBadges.fulfilled, (state, action) => {
      state.loading = false;
      state.badges = action.payload;
    });
    builder.addCase(getAllBadges.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get My Badges
    builder.addCase(getMyBadges.fulfilled, (state, action) => {
      state.myBadges = action.payload;
    });

    // Create Badge
    builder.addCase(createBadge.fulfilled, (state, action) => {
      state.badges.push(action.payload);
    });

    // Update Badge
    builder.addCase(updateBadge.fulfilled, (state, action) => {
      const index = state.badges.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.badges[index] = action.payload;
      }
    });

    // Delete Badge
    builder.addCase(deleteBadge.fulfilled, (state, action) => {
      state.badges = state.badges.filter((b) => b.id !== action.payload);
    });
  },
});

export const { clearBadgeError } = badgeSlice.actions;
export default badgeSlice.reducer;
