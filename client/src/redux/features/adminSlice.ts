import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminAPI from '../../api/admin.api';

interface AdminState {
  users: any[];
  pendingSkills: any[];
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalExperts: number;
    totalSkills: number;
    totalSessions: number;
    completedSessions: number;
    totalRevenue: number;
    totalBadges: number;
    userGrowth: number;
    sessionGrowth: number;
    pendingVerifications?: number;
    newSignupsToday?: number;
    activeSessions?: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  pendingSkills: [],
  stats: null,
  loading: false,
  error: null,
};

// Async Thunks
export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllUsers(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, status }: { userId: string; status: 'active' | 'suspended' }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateUserStatus(userId, status);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await adminAPI.deleteUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getPendingSkills = createAsyncThunk(
  'admin/getPendingSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getPendingSkills();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const approveSkill = createAsyncThunk(
  'admin/approveSkill',
  async (skillId: string, { rejectWithValue }) => {
    try {
      await adminAPI.approveSkill(skillId);
      return skillId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const rejectSkill = createAsyncThunk(
  'admin/rejectSkill',
  async ({ skillId, reason }: { skillId: string; reason: string }, { rejectWithValue }) => {
    try {
      await adminAPI.rejectSkill(skillId, reason);
      return skillId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getPlatformStats = createAsyncThunk(
  'admin/getPlatformStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getPlatformStats();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Users
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Pending Skills
    builder.addCase(getPendingSkills.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingSkills = action.payload;
    });
    builder.addCase(getPendingSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Platform Stats
    builder.addCase(getPlatformStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlatformStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(getPlatformStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete User
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    });

    // Approve Skill
    builder.addCase(approveSkill.fulfilled, (state, action) => {
      state.pendingSkills = state.pendingSkills.filter((s) => s.id !== action.payload);
    });

    // Reject Skill
    builder.addCase(rejectSkill.fulfilled, (state, action) => {
      state.pendingSkills = state.pendingSkills.filter((s) => s.id !== action.payload);
    });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
