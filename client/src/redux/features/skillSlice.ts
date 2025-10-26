// src/redux/features/skillSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as skillAPI from '../../api/skill.api';

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
  mySkills: Skill[];
  skillExperts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: [],
  currentSkill: null,
  mySkills: [],
  skillExperts: [],
  loading: false,
  error: null,
};

// Get all skills
export const getAllSkills = createAsyncThunk(
  'skill/getAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getAllSkills(params);
      return response.data.skills || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch skills');
    }
  }
);

// Get skill by ID
export const getSkillById = createAsyncThunk(
  'skill/getById',
  async (skillId: string, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getSkillById(skillId);
      return response.data.skill || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch skill');
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
      return response.data.skill || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create skill');
    }
  }
);

// Update skill
export const updateSkill = createAsyncThunk(
  'skill/update',
  async ({ skillId, data }: { skillId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await skillAPI.updateSkill(skillId, data);
      return response.data.skill || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update skill');
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
      return rejectWithValue(error.response?.data?.message || 'Failed to delete skill');
    }
  }
);

// Get my skills
export const getMySkills = createAsyncThunk(
  'skill/getMySkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getMySkills();
      return response.data.skills || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch my skills');
    }
  }
);

// Search skills
export const searchSkills = createAsyncThunk(
  'skill/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await skillAPI.searchSkills(query);
      return response.data.skills || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search skills');
    }
  }
);

// Get skill experts
export const getSkillExperts = createAsyncThunk(
  'skill/getExperts',
  async (skillId: string, { rejectWithValue }) => {
    try {
      const response = await skillAPI.getSkillExperts(skillId);
      return response.data.experts || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch skill experts');
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
      return rejectWithValue(error.response?.data?.message || 'Failed to endorse skill');
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
    builder
      .addCase(getAllSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Skill By ID
    builder
      .addCase(getSkillById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkillById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSkill = action.payload;
      })
      .addCase(getSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get My Skills
    builder
      .addCase(getMySkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMySkills.fulfilled, (state, action) => {
        state.loading = false;
        state.mySkills = action.payload;
      })
      .addCase(getMySkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Skill
    builder
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills.unshift(action.payload);
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Skill
    builder
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.skills.findIndex(
          (s) => s.id === action.payload.id || (s as any)._id === action.payload.id
        );
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Skill
    builder
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = state.skills.filter(
          (s) => s.id !== action.payload && (s as any)._id !== action.payload
        );
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search Skills
    builder
      .addCase(searchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(searchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Skill Experts
    builder
      .addCase(getSkillExperts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkillExperts.fulfilled, (state, action) => {
        state.loading = false;
        state.skillExperts = action.payload;
      })
      .addCase(getSkillExperts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Endorse Skill
    builder
      .addCase(endorseSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(endorseSkill.fulfilled, (state) => {
        state.loading = false;
        // Optionally update the current skill if needed
      })
      .addCase(endorseSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSkillError, clearCurrentSkill } = skillSlice.actions;
export default skillSlice.reducer;
