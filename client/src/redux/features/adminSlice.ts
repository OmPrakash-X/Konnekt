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
    pendingVerifications: number;
    newSignupsToday: number;
    activeSessions: number;
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
  async (params: any) => {
    const response = await adminAPI.getAllUsers(params);
    return response.data;
  }
);

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId }: { userId: string; status: string }) => {
    const response = await adminAPI.suspendUser(userId);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId: string) => {
    const response = await adminAPI.deleteUser(userId);
    return response.data;
  }
);

export const getPendingSkills = createAsyncThunk(
  'admin/getPendingSkills',
  async () => {
    const response = await adminAPI.getPendingSkills();
    return response.data;
  }
);

export const approveSkill = createAsyncThunk(
  'admin/approveSkill',
  async (skillId: string) => {
    const response = await adminAPI.verifySkill(skillId, true);
    return response.data;
  }
);

export const rejectSkill = createAsyncThunk(
  'admin/rejectSkill',
  async ({ skillId}: { skillId: string; reason: string }) => {
    const response = await adminAPI.verifySkill(skillId, false);
    return response.data;
  }
);

export const getPlatformStats = createAsyncThunk(
  'admin/getPlatformStats',
  async () => {
    const response = await adminAPI.getPlatformStats();
    return response.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user status';
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      })

      // Get Pending Skills
      .addCase(getPendingSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingSkills = action.payload.skills || action.payload;
      })
      .addCase(getPendingSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pending skills';
      })

      // Approve Skill
      .addCase(approveSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(approveSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to approve skill';
      })

      // Reject Skill
      .addCase(rejectSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(rejectSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to reject skill';
      })

      // Get Platform Stats
      .addCase(getPlatformStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlatformStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats || action.payload;
      })
      .addCase(getPlatformStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch platform stats';
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
