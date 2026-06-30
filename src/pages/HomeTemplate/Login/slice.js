import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';



const USER_LOGIN_KEY = "USER_LOGIN";

export const fetchLogin = createAsyncThunk(

  'login/fetchLogin', 
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post('/QuanLyNguoiDung/DangNhap', user);
      
      localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(res.data.content));
      
      return res.data.content;
    } catch (error) {
      const errorMessage = error.response?.data?.content || "Login failed. Please check your credentials and try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

const userData = localStorage.getItem(USER_LOGIN_KEY);

const initialState = {
  loading: false,
  error: null,
  userLogin: userData ? JSON.parse(userData) : null,
};

const loginSlice = createSlice({ 
  name: 'login', 
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem(USER_LOGIN_KEY);
      state.userLogin = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userLogin = action.payload;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { logOut, clearError } = loginSlice.actions;
export default loginSlice.reducer;