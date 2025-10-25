// reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewAPI from '../../api/review.api';

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer: any;
  date: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const createReview = createAsyncThunk(
  'review/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.createReview(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getReviewsByExpert = createAsyncThunk(
  'review/getByExpert',
  async (expertId: string, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.getReviewsByExpert(expertId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewsByExpert.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviewsByExpert.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
    });
  },
});

export default reviewSlice.reducer;
