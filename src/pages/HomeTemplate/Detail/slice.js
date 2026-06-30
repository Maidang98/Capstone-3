import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchMovieDetail = createAsyncThunk(
  "movieDetail/fetchMovieDetail",
  async (movieId, { rejectWithValue }) => {
    try {
      const [detailRes, scheduleRes] = await Promise.all([
        api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`),
        api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`),
      ]);

      return {
        detail: detailRes.data.content,
        schedule: scheduleRes.data.content,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieDetailSlice.reducer;