import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as transactionAPI from '../../api/transaction.api';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: string;
}

interface TransactionState {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  balance: 0,
  transactions: [],
  loading: false,
  error: null,
};

// Get wallet balance
export const getWalletBalance = createAsyncThunk(
  'transaction/getBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getWalletBalance();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get transaction history (using getMyTransactions from your API)
export const getTransactionHistory = createAsyncThunk(
  'transaction/getHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.getMyTransactions();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Add credits (with paymentMethod)
export const addCredits = createAsyncThunk(
  'transaction/addCredits',
  async (data: { amount: number; paymentMethod: string }, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.addCredits(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Wallet Balance
    builder.addCase(getWalletBalance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWalletBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload.balance;
    });
    builder.addCase(getWalletBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Transaction History
    builder.addCase(getTransactionHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getTransactionHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Credits
    builder.addCase(addCredits.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      if (action.payload.transaction) {
        state.transactions.unshift(action.payload.transaction);
      }
    });
  },
});

export const { clearTransactionError } = transactionSlice.actions;
export default transactionSlice.reducer;
