import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const userStorage = localStorage.getItem("user");

const initialState = {
loading: false,
data: userStorage ? JSON.parse(userStorage) : null,
error: null,
};

export const actAuth = createAsyncThunk(
"auth/actAuth",
async (userLogin, { rejectWithValue }) => {
try {
const response = await api.post(
"/QuanLyNguoiDung/DangNhap",
userLogin
);

  const user = response.data.content;

  if (user.maLoaiNguoiDung !== "QuanTri") {
    return rejectWithValue(
      "Access denied. Administrator privileges required."
    );
  }

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  return user;
} catch (error) {
  return rejectWithValue(
    error.response?.data?.content ||
    "Invalid username or password."
  );
}

}
);

const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
logOut: (state) => {
localStorage.removeItem("user");

  state.loading = false;
  state.data = null;
  state.error = null;
},

},
extraReducers: (builder) => {
builder

  .addCase(actAuth.pending, (state) => {
    state.loading = true;
    state.error = null;
  })

  .addCase(actAuth.fulfilled, (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.error = null;
  })

  .addCase(actAuth.rejected, (state, action) => {
    state.loading = false;
    state.data = null;
    state.error = action.payload;
  });

},
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
