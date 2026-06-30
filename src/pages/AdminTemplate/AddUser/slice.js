import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
loading: false,
data: null,
error: null,
};

export const actAddUser = createAsyncThunk(
"addUser/actAddUser",
async (user, { rejectWithValue }) => {
try {
const response = await api.post(
"/QuanLyNguoiDung/ThemNguoiDung",
user
);

  return response.data.content;
} catch (error) {
  return rejectWithValue(
    error.response?.data?.content ||
    "Failed to create user."
  );
}

}
);


const addUserSlice = createSlice({
name: "addUser",
initialState,
reducers: {
resetAddUserState: (state) => {
state.loading = false;
state.data = null;
state.error = null;
},
},
extraReducers: (builder) => {
builder

  .addCase(actAddUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  })

  .addCase(actAddUser.fulfilled, (state, action) => {
    state.loading = false;
    state.data = action.payload;
  })

  .addCase(actAddUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

},
});

export const {
resetAddUserState,
} = addUserSlice.actions;

export default addUserSlice.reducer;
