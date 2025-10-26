import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as authAPI from "../../api/auth.api";

interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "expert" | "admin";
  isEmailVerified: boolean;
  accountStatus?: string;
  bio?: string;
  location?: string | { country?: string; city?: string; state?: string };
  joinedDate?: string;
  createdAt?: string;
  rating?: number;
  totalReviews?: number;
  totalSessions?: number;
  expertIn?: string[];
  badges?: Array<{
    name: string;
    icon: string;
  }>;
  isExpert?: boolean;
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
  __v?: number;

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

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  tempEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  tempEmail: null,
};

const transformUserData = (userData: any): User => {
  return {
    ...userData,
    id: userData._id || userData.id,
    joinedDate: userData.createdAt || userData.joinedDate,
    isExpert: userData.role === "expert",
  };
};

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("🔐 Logging in...");
      const response = await authAPI.login(credentials);
      console.log("✅ Login successful");

      return {
        user: transformUserData(response.data.user),
        token: response.data.token,
      };
    } catch (error: any) {
      console.error("❌ Login failed:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("📝 Signing up...");
      const response = await authAPI.signup(userData);
      console.log("✅ Signup successful");

      return { ...response.data, email: userData.email };
    } catch (error: any) {
      console.error("❌ Signup failed:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📡 Loading user from /user/me...");
      const response = await authAPI.getProfile();
      console.log("✅ User loaded:", response.data.user);

      return transformUserData(response.data.user);
    } catch (error: any) {
      console.error(
        "❌ Failed to load user:",
        error.response?.data?.message || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user"
      );
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🚪 Logging out...");
      await authAPI.logout();
      console.log("✅ Logout successful");
    } catch (error: any) {
      console.error("⚠️ Logout error:", error);
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      console.log("✉️ Verifying email...");
      const response = await authAPI.verifyEmailOtp(data);
      console.log("✅ Email verified");

      return {
        user: transformUserData(response.data.user),
        token: response.data.token,
      };
    } catch (error: any) {
      console.error("❌ Verification failed:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearTempEmail: (state) => {
      state.tempEmail = null;
    },
    logoutLocal: (state) => {
      console.log("🧹 Clearing local auth state");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.tempEmail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });

    // SIGNUP
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.tempEmail = action.payload.email;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // LOAD USER
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });

    // LOGOUT
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.tempEmail = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.tempEmail = null;
      });

    // VERIFY EMAIL
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.tempEmail = null;
        state.error = null;

        if (state.user) {
          state.user.isEmailVerified = true;
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { clearAuthError, updateUser, clearTempEmail, logoutLocal } = authSlice.actions;

export default authSlice.reducer;
