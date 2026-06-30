import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  data: [],
  banners: [],
  error: null,
};

// ================= BANNERS =================
export const fetchBanners = createAsyncThunk(
  "home/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("QuanLyPhim/LayDanhSachBanner");
      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.content || error.message || "Banner error"
      );
    }
  }
);

// ================= MOVIES =================
export const fetchData = createAsyncThunk(
  "home/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.content || error.message || "Movie error"
      );
    }
  }
);

// ================= SLICE =================
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // ========== MOVIES ==========
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ========== BANNERS ==========
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;