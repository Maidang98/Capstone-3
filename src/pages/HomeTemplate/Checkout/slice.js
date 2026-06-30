import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api";

const initialState = {
  loading: false,
  roomDetail: null,
  selectedSeats: [],
  error: null,
};

// ==================== THUNKS ====================

export const fetchRoomDetail = createAsyncThunk(
  "checkout/fetchRoomDetail",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const bookTicket = createAsyncThunk(
  "checkout/bookTicket",
  async (bookingData, { rejectWithValue, dispatch }) => {
    try {
      await api.post("QuanLyDatVe/DatVe", bookingData);

      dispatch(fetchRoomDetail(bookingData.maLichChieu));

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ==================== SLICE ====================

const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {
    toggleSeat: (state, action) => {
      const seat = action.payload;

      const index = state.selectedSeats.findIndex(
        (s) => s.maGhe === seat.maGhe
      );

      if (index !== -1) {
        state.selectedSeats.splice(index, 1);
      } else {
        state.selectedSeats.push(seat);
      }
    },

    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.roomDetail = action.payload;
      })

      .addCase(fetchRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(bookTicket.pending, (state) => {
        state.loading = true;
      })

      .addCase(bookTicket.fulfilled, (state) => {
        state.loading = false;
        state.selectedSeats = [];
      })

      .addCase(bookTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { toggleSeat, clearSelectedSeats } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;