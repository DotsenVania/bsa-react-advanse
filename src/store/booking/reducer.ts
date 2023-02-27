import { createReducer } from "@reduxjs/toolkit";
import {
  getBookingsData,
  postBooking,
  deleteBooking,
  clearMessage,
} from "./actions";
interface IBookingsData {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  totalPrice: number;
  date: string;
  createdAt: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
}

const initialState = {
  bookingsData: [] as any,
  loadingData: false,
  error: false,
  messagePost: "",
  messageDelete: "",
  currentId: "",
  ll: false,
};
export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getBookingsData.pending, (state) => {
    state.loadingData = true;
    state.error = false;
  });
  builder.addCase(getBookingsData.fulfilled, (state, action) => {
    state.loadingData = false;
    state.error = false;
    state.bookingsData = action.payload;
  });
  builder.addCase(getBookingsData.rejected, (state) => {
    state.loadingData = false;
    state.error = true;
  });

  builder.addCase(postBooking.pending, (state) => {
    state.loadingData = true;
    state.error = false;
    state.messagePost = "";
  });
  builder.addCase(postBooking.fulfilled, (state, action) => {
    state.loadingData = false;
    state.error = false;
    state.bookingsData.push(action.payload);
    state.messagePost = "Success!";
  });
  builder.addCase(postBooking.rejected, (state) => {
    state.loadingData = false;
    state.error = true;
  });

  builder.addCase(deleteBooking.pending, (state, action) => {
    state.error = false;
    state.messageDelete = "";
  });
  builder.addCase(deleteBooking.fulfilled, (state, action) => {
    state.error = false;
    state.messageDelete = "Successfully deleted!";
    const index = state.bookingsData.filter(
      (booking: IBookingsData) => booking.id !== action.payload
    );
    state.bookingsData = index;
  });
  builder.addCase(deleteBooking.rejected, (state) => {
    state.error = true;
  });

  builder.addCase(clearMessage, (state) => {
    state.messageDelete = "";
    state.messagePost = "";
  });
});
