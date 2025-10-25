// src/redux/features/badgeSlice.ts
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
      // Backend returns { success: true, badges: [...] }
      return response.data.badges || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch badges');
    }
  }
);

// Get my badges
export const getMyBadges = createAsyncThunk(
  'badge/getMyBadges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.getMyBadges();
      return response.data.badges || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch my badges');
    }
  }
);

// Create badge (admin only)
export const createBadge = createAsyncThunk(
  'badge/createBadge',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.createBadge(data);
      // Backend returns { success: true, message: "...", badge: {...} }
      return response.data.badge || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create badge');
    }
  }
);

// Update badge (admin only)
export const updateBadge = createAsyncThunk(
  'badge/updateBadge',
  async ({ badgeId, data }: { badgeId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await badgeAPI.updateBadge({ badgeId, data });
      return response.data.badge || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update badge');
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
      return rejectWithValue(error.response?.data?.message || 'Failed to delete badge');
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
    builder
      .addCase(getAllBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.badges = action.payload;
      })
      .addCase(getAllBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get My Badges
    builder
      .addCase(getMyBadges.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.myBadges = action.payload;
      })
      .addCase(getMyBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Badge
    builder
      .addCase(createBadge.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBadge.fulfilled, (state, action) => {
        state.loading = false;
        state.badges.unshift(action.payload); // Add to beginning
      })
      .addCase(createBadge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Badge
    builder
      .addCase(updateBadge.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBadge.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both 'id' and '_id' fields
        const index = state.badges.findIndex(
          (b) => b.id === action.payload.id || b._id === action.payload.id || b.id === action.payload._id || b._id === action.payload._id
        );
        if (index !== -1) {
          state.badges[index] = action.payload;
        }
      })
      .addCase(updateBadge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Badge
    builder
      .addCase(deleteBadge.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBadge.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both 'id' and '_id' fields
        state.badges = state.badges.filter(
          (b) => b.id !== action.payload && b._id !== action.payload
        );
      })
      .addCase(deleteBadge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBadgeError } = badgeSlice.actions;
export default badgeSlice.reducer;
