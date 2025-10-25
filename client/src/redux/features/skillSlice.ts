import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as skillAPI from '../../api/skill.api';

// Complete Skill interface matching SkillCard component
interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  creditsPerHour: number;
  totalExperts: number;
  totalLearners: number;
  averageRating: number;
  topExperts?: Array<{ name: string; avatar?: string }>;
}

interface SkillState {
  skills: Skill[];
  currentSkill: Skill | null;
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: [],
  currentSkill: null,
  loading: false,
  error: null,
};

// Get all skills
export const getAllSkills = createAsyncThunk(
  'skill/getAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getAllSkills(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get skill by ID
export const getSkillById = createAsyncThunk(
  'skill/getById',
  async (skillId: string, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getSkillById(skillId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create skill
export const createSkill = createAsyncThunk(
  'skill/create',
  async (data: {
    name: string;
    category: string;
    description: string;
    level: string;
    creditsPerHour: number;
  }, { rejectWithValue }) => {
    try {
      const response = await skillAPI.createSkill(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update skill
export const updateSkill = createAsyncThunk(
  'skill/update',
  async ({ skillId, data }: { skillId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await skillAPI.updateSkill(skillId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete skill
export const deleteSkill = createAsyncThunk(
  'skill/delete',
  async (skillId: string, { rejectWithValue }) => {
    try {
      await skillAPI.deleteSkill(skillId);
      return skillId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get my skills
export const getMySkills = createAsyncThunk(
  'skill/getMySkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getMySkills();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Search skills
export const searchSkills = createAsyncThunk(
  'skill/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await skillAPI.searchSkills(query);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get skill experts
export const getSkillExperts = createAsyncThunk(
  'skill/getExperts',
  async (skillId: string, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getSkillExperts(skillId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Endorse skill
export const endorseSkill = createAsyncThunk(
  'skill/endorse',
  async ({ skillId, note }: { skillId: string; note?: string }, { rejectWithValue }) => {
    try {
      const response = await skillAPI.endorseSkill(skillId, { note });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    clearSkillError: (state) => {
      state.error = null;
    },
    clearCurrentSkill: (state) => {
      state.currentSkill = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Skills
    builder.addCase(getAllSkills.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.skills = action.payload;
    });
    builder.addCase(getAllSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Skill By ID
    builder.addCase(getSkillById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSkillById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentSkill = action.payload;
    });
    builder.addCase(getSkillById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get My Skills
    builder.addCase(getMySkills.fulfilled, (state, action) => {
      state.skills = action.payload;
    });

    // Create Skill
    builder.addCase(createSkill.fulfilled, (state, action) => {
      state.skills.push(action.payload);
    });

    // Update Skill
    builder.addCase(updateSkill.fulfilled, (state, action) => {
      const index = state.skills.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    });

    // Delete Skill
    builder.addCase(deleteSkill.fulfilled, (state, action) => {
      state.skills = state.skills.filter((s) => s.id !== action.payload);
    });

    // Search Skills
    builder.addCase(searchSkills.fulfilled, (state, action) => {
      state.skills = action.payload;
    });
  },
});

export const { clearSkillError, clearCurrentSkill } = skillSlice.actions;
export default skillSlice.reducer;
