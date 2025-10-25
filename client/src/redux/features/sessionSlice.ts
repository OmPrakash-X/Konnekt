import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as sessionAPI from '../../api/session.api';

// Complete Session interface matching SessionCard component
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
  mode: 'online' | 'offline';
  location?: string;
  meetingLink?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
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
  'session/getMySessions',
  async (params: { status?: 'upcoming' | 'completed' | 'cancelled'; role?: 'learner' | 'expert' }, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.getMySessions(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get session by ID
export const getSessionById = createAsyncThunk(
  'session/getById',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.getSessionById(sessionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Book session
export const bookSession = createAsyncThunk(
  'session/book',
  async (data: {
    expertId: string;
    skillId: string;
    date: string;
    startTime: string;
    duration: number;
    mode: 'online' | 'offline';
    notes?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.bookSession(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Cancel session
export const cancelSession = createAsyncThunk(
  'session/cancel',
  async ({ sessionId, reason }: { sessionId: string; reason?: string }, { rejectWithValue }) => {
    try {
      await sessionAPI.cancelSession(sessionId, reason);
      return sessionId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Reschedule session
export const rescheduleSession = createAsyncThunk(
  'session/reschedule',
  async ({ sessionId, date, startTime }: { sessionId: string; date: string; startTime: string }, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.rescheduleSession(sessionId, { date, startTime });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Join session
export const joinSession = createAsyncThunk(
  'session/join',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.joinSession(sessionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get upcoming sessions
export const getUpcomingSessions = createAsyncThunk(
  'session/getUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.getUpcomingSessions();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get session history
export const getSessionHistory = createAsyncThunk(
  'session/getHistory',
  async (params: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await sessionAPI.getSessionHistory(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
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
    builder.addCase(getMySessions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMySessions.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
    });
    builder.addCase(getMySessions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Session By ID
    builder.addCase(getSessionById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSessionById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentSession = action.payload;
    });
    builder.addCase(getSessionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Upcoming Sessions
    builder.addCase(getUpcomingSessions.fulfilled, (state, action) => {
      state.upcomingSessions = action.payload;
    });

    // Book Session
    builder.addCase(bookSession.fulfilled, (state, action) => {
      state.sessions.push(action.payload);
    });

    // Cancel Session
    builder.addCase(cancelSession.fulfilled, (state, action) => {
      state.sessions = state.sessions.filter((s) => s.id !== action.payload);
    });

    // Reschedule Session
    builder.addCase(rescheduleSession.fulfilled, (state, action) => {
      const index = state.sessions.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    });

    // Get History
    builder.addCase(getSessionHistory.fulfilled, (state, action) => {
      state.sessions = action.payload;
    });
  },
});

export const { clearSessionError, clearCurrentSession } = sessionSlice.actions;
export default sessionSlice.reducer;
