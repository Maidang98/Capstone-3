import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  listUser: [],
  allUsers: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const getAuthToken = () => {
  const userAdmin = localStorage.getItem("USER_ADMIN");

  return userAdmin
    ? JSON.parse(userAdmin).accessToken
    : null;
};

/* =========================================
   FETCH USERS
========================================= */
export const actFetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      );

      return result.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to load user list."
      );
    }
  }
);

/* =========================================
   DELETE USER
========================================= */
export const actDeleteUser = createAsyncThunk(
  "users/delete",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const token = getAuthToken();

      await api.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return taiKhoan;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to delete user."
      );
    }
  }
);

/* =========================================
   UPDATE USER
========================================= */
export const actUpdateUser = createAsyncThunk(
  "users/update",
  async (user, { rejectWithValue }) => {
    try {
      const token = getAuthToken();

      const result = await api.post(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return result.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Failed to update user."
      );
    }
  }
);

/* =========================================
   SEARCH USER
========================================= */
export const actSearchUser = createAsyncThunk(
  "users/search",
  async (keyword, { rejectWithValue }) => {
    try {
      const url = keyword
        ? `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`
        : `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;

      const result = await api.get(url);

      return result.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content ||
          "Search operation failed."
      );
    }
  }
);

/* =========================================
   SLICE
========================================= */
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* =========================
         FETCH USERS
      ========================= */
      .addCase(actFetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        actFetchUsers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.listUser = action.payload;
          state.allUsers = action.payload;
        }
      )

      .addCase(
        actFetchUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* =========================
         SEARCH USERS
      ========================= */
      .addCase(actSearchUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        actSearchUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.listUser = action.payload;
        }
      )

      .addCase(
        actSearchUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /* =========================
         DELETE USER
      ========================= */
      .addCase(actDeleteUser.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(
        actDeleteUser.fulfilled,
        (state, action) => {
          state.actionLoading = false;

          state.listUser =
            state.listUser.filter(
              (user) =>
                user.taiKhoan !== action.payload
            );

          state.allUsers =
            state.allUsers.filter(
              (user) =>
                user.taiKhoan !== action.payload
            );
        }
      )

      .addCase(
        actDeleteUser.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      )

      /* =========================
         UPDATE USER
      ========================= */
      .addCase(actUpdateUser.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(
        actUpdateUser.fulfilled,
        (state) => {
          state.actionLoading = false;
        }
      )

      .addCase(
        actUpdateUser.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default userSlice.reducer;