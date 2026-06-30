import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import api from "@services/api";

/* ENTITY ADAPTER */
const movieAdapter = createEntityAdapter({
  selectId: (movie) => movie.maPhim,
  sortComparer: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
});

/* INITIAL STATE */
const initialState = movieAdapter.getInitialState({
  movieSchedule: null,

  loadingMovies: false,
  loadingSchedule: false,

  error: null,
});

/* FETCH MOVIES */
export const fetchMoviesForBooking = createAsyncThunk(
  "booking/fetchMoviesForBooking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
      );

      return res.data.content || res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch movie list"
      );
    }
  }
);

/* FETCH MOVIE SCHEDULE */
export const fetchMovieSchedule = createAsyncThunk(
  "booking/fetchMovieSchedule",
  async (maPhim, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`
      );
      console.log("🔥 RAW API RESPONSE:", res.data);

      return res.data.content || res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch movie schedule"
      );
    }
  }
);

/* SLICE */
const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    clearSchedule: (state) => {
      state.movieSchedule = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH MOVIES
      .addCase(fetchMoviesForBooking.pending, (state) => {
        state.loadingMovies = true;
        state.error = null;
      })

      .addCase(fetchMoviesForBooking.fulfilled, (state, action) => {
        state.loadingMovies = false;

        movieAdapter.setAll(state, action.payload);
      })

      .addCase(fetchMoviesForBooking.rejected, (state, action) => {
        state.loadingMovies = false;
        state.error = action.payload;
      })

      // FETCH SCHEDULE
      .addCase(fetchMovieSchedule.pending, (state) => {
        console.log("FETCH SCHEDULE PENDING");
        state.loadingSchedule = true;
        state.error = null;
      })

      .addCase(fetchMovieSchedule.fulfilled, (state, action) => {
        console.log("API schedule:", action.payload);
        state.loadingSchedule = false;
        state.movieSchedule = action.payload;
      })

      .addCase(fetchMovieSchedule.rejected, (state, action) => {
        console.log("API error:", action.payload);
        state.loadingSchedule = false;
        state.error = action.payload;
      });
  },
});

/* ACTIONS */
export const { clearSchedule } = bookingSlice.actions;

/* ENTITY SELECTORS */
export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
} = movieAdapter.getSelectors(
  (state) => state.bookingReducer
);

/* CUSTOM SELECTORS */
export const selectMovieSchedule = (state) =>
  state.bookingReducer.movieSchedule;

export const selectLoadingMovies = (state) =>
  state.bookingReducer.loadingMovies;

export const selectLoadingSchedule = (state) =>
  state.bookingReducer.loadingSchedule;

export const selectBookingError = (state) =>
  state.bookingReducer.error;

/* REDUCER */
export default bookingSlice.reducer;