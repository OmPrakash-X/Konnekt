// src/redux/features/sessionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as sessionAPI from "../../api/session.api";

interface Session {
  id: string;
  title: string;
  expert: {
    name: string;
    avatar?: string;
  };
  learner?: {
    name: string;
    avatar?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  mode: "online" | "offline";
  location?: string;
  meetingLink?: string;
  status: "upcoming" | "completed" | "cancelled";
  credits: number;
  notes?: string;
}

interface SessionState {
  sessions: Session[];
  upcomingSessions: Session[];
  currentSession: Session | null;
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  upcomingSessions: [],
  currentSession: null,
  loading: false,
  error: null,
};

// Get my sessions
export const getMySessions = createAsyncThunk(
  "session/getMySessions",
  async (
    params: {
      status?: "upcoming" | "completed" | "cancelled";
      role?: "learner" | "expert";
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await sessionAPI.getMySessions(params);
      return response.data.sessions || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sessions"
      );
    }
  }
);

// Get session by ID
export const getSessionById = createAsyncThunk(
  "session/getById",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.getSessionById(sessionId);
      return response.data.session || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch session"
      );
    }
  }
);

// Book session
export const bookSession = createAsyncThunk(
  "session/book",
  async (
    data: {
      expertId: string;
      skillId: string;
      date: string;
      startTime: string;
      duration: number;
      mode: "online" | "offline";
      notes?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await sessionAPI.bookSession(data);
      return response.data.session || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to book session"
      );
    }
  }
);

// Cancel session
export const cancelSession = createAsyncThunk(
  "session/cancel",
  async (
    { sessionId, reason }: { sessionId: string; reason?: string },
    { rejectWithValue }
  ) => {
    try {
      await sessionAPI.cancelSession(sessionId, reason);
      return sessionId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel session"
      );
    }
  }
);

// Reschedule session
export const rescheduleSession = createAsyncThunk(
  "session/reschedule",
  async (
    {
      sessionId,
      date,
      startTime,
    }: { sessionId: string; date: string; startTime: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await sessionAPI.rescheduleSession(sessionId, {
        date,
        startTime,
      });
      return response.data.session || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reschedule session"
      );
    }
  }
);

// Get upcoming sessions
export const getUpcomingSessions = createAsyncThunk(
  "session/getUpcoming",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.getUpcomingSessions();
      return response.data.sessions || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch upcoming sessions"
      );
    }
  }
);

// Get session history
export const getSessionHistory = createAsyncThunk(
  "session/getHistory",
  async (
    params: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await sessionAPI.getSessionHistory(params);
      return response.data.sessions || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch session history"
      );
    }
  }
);

// Complete session
export const completeSession = createAsyncThunk(
  "session/complete",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.completeSession(sessionId);
      return response.data.session || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to complete session"
      );
    }
  }
);

// Confirm session
export const confirmSession = createAsyncThunk(
  "session/confirm",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.confirmSession(sessionId);
      return response.data.session || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm session"
      );
    }
  }
);

export const joinSession = createAsyncThunk(
  "session/join",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      // This would typically get meeting link or open session
      const response = await sessionAPI.getSessionById(sessionId);
      return response.data.session || response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to join session"
      );
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSessionError: (state) => {
      state.error = null;
    },
    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
  },
  extraReducers: (builder) => {
    // Get My Sessions
    builder
      .addCase(getMySessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMySessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(getMySessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Session By ID
    builder
      .addCase(getSessionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSessionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(getSessionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Upcoming Sessions
    builder
      .addCase(getUpcomingSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUpcomingSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingSessions = action.payload;
      })
      .addCase(getUpcomingSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Book Session
    builder
      .addCase(bookSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.unshift(action.payload);
      })
      .addCase(bookSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Cancel Session
    builder.addCase(cancelSession.fulfilled, (state, action) => {
      state.sessions = state.sessions.filter(
        (s) => s.id !== action.payload && (s as any)._id !== action.payload
      );
    });

    // Reschedule Session
    builder.addCase(rescheduleSession.fulfilled, (state, action) => {
      const index = state.sessions.findIndex(
        (s) =>
          s.id === action.payload.id || (s as any)._id === action.payload.id
      );
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    });

    // Get History
    builder
      .addCase(getSessionHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSessionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(getSessionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Complete Session
    builder.addCase(completeSession.fulfilled, (state, action) => {
      const index = state.sessions.findIndex(
        (s) =>
          s.id === action.payload.id || (s as any)._id === action.payload.id
      );
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    });

    // Confirm Session
    builder.addCase(confirmSession.fulfilled, (state, action) => {
      const index = state.sessions.findIndex(
        (s) =>
          s.id === action.payload.id || (s as any)._id === action.payload.id
      );
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    });
    builder
      .addCase(joinSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(joinSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSessionError, clearCurrentSession } = sessionSlice.actions;
export default sessionSlice.reducer;
