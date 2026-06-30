import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const fetchRegister = createAsyncThunk(
  'register/fetchRegister',
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post('/QuanLyNguoiDung/DangKy', {
        ...user,
        maNhom: "GP01",
      });

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.content ||
        error.message ||
        "Đăng ký thất bại"
      );
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;