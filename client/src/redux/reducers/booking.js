import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBookings: [],
  newBooking:undefined,
  error: "",
  loading: false,
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    bookingAddSuccess: (state, action) => {
      state.loading = false;
      state.userBookings.push(action.payload.booking);
      state.newBooking = action.payload.booking
    },
    bookingGetSuccess: (state, action) => {
      state.loading = false;
      state.userBookings = action.payload.bookings;
    },
    clearNewBooking:(state) =>{
        state.newBooking = undefined
    },
    bookingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  bookingRequest,
  bookingAddSuccess,
  bookingFail,
  bookingGetSuccess,
  clearNewBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
