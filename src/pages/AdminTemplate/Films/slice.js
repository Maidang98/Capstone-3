import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

/* =========================================
   GET MOVIE LIST
========================================= */
export const fetchListMovieAdmin = createAsyncThunk(
  "films/fetchListMovieAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to load movie list."
      );
    }
  }
);

/* =========================================
   ADD MOVIE
========================================= */
export const addMovieUpload = createAsyncThunk(
  "films/addMovieUpload",
  async (formData, { rejectWithValue }) => {
    try {
      const userAdmin =
        localStorage.getItem("USER_ADMIN");

      const token = userAdmin
        ? JSON.parse(userAdmin).accessToken
        : null;

      const res = await api.post(
        "/QuanLyPhim/ThemPhimUploadHinh",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to add movie."
      );
    }
  }
);

/* =========================================
   UPDATE MOVIE
========================================= */
export const updateMovieUpload = createAsyncThunk(
  "films/updateMovieUpload",
  async (formData, { rejectWithValue }) => {
    try {
      const userAdmin =
        localStorage.getItem("USER_ADMIN");

      const token = userAdmin
        ? JSON.parse(userAdmin).accessToken
        : null;

      const res = await api.post(
        "/QuanLyPhim/CapNhatPhimUpload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to update movie."
      );
    }
  }
);

/* =========================================
   DELETE MOVIE
========================================= */
export const deleteMovie = createAsyncThunk(
  "films/deleteMovie",
  async (maPhim, { rejectWithValue }) => {
    try {
      const userAdmin = JSON.parse(
        localStorage.getItem("USER_ADMIN")
      );

      const token = userAdmin?.accessToken;

      await api.delete(
        `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return maPhim;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to delete movie."
      );
    }
  }
);

/* =========================================
   INITIAL STATE
========================================= */
const initialState = {
  listMovie: [],
  loading: false,
  actionLoading: false,
  error: null,
};

/* =========================================
   SLICE
========================================= */
const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* =========================
         FETCH MOVIES
      ========================= */
      .addCase(fetchListMovieAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchListMovieAdmin.fulfilled,
        (state, action) => {
          state.loading = false;
          state.listMovie = action.payload;
        }
      )

      .addCase(
        fetchListMovieAdmin.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* =========================
         ADD MOVIE
      ========================= */
      .addCase(addMovieUpload.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(addMovieUpload.fulfilled, (state) => {
        state.actionLoading = false;
      })

      .addCase(
        addMovieUpload.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      )

      /* =========================
         UPDATE MOVIE
      ========================= */
      .addCase(
        updateMovieUpload.pending,
        (state) => {
          state.actionLoading = true;
          state.error = null;
        }
      )

      .addCase(
        updateMovieUpload.fulfilled,
        (state) => {
          state.actionLoading = false;
        }
      )

      .addCase(
        updateMovieUpload.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      )

      /* =========================
         DELETE MOVIE
      ========================= */
      .addCase(deleteMovie.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(
        deleteMovie.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          state.listMovie =
            state.listMovie.filter(
              (movie) =>
                movie.maPhim !== action.payload
            );
        }
      )

      .addCase(
        deleteMovie.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default filmsSlice.reducer;
