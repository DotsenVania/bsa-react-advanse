import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import useHttpRequest from "../../hooks/useHttpRequest";

export const getBookingsData = createAsyncThunk(
  "bookings/bookingsData",
  async () => {
    const tokenSearch = localStorage.getItem("travelAppApiToken");
    const { request } = useHttpRequest();
    const bookingsData = await request(
      "https://travel-app-api.up.railway.app/api/v1/bookings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSearch}`,
        },
      }
    );
    return bookingsData;
  }
);

export const postBooking = createAsyncThunk(
  "bookings/postBooking",
  async (bookingData: any) => {
    const tokenSearch = localStorage.getItem("travelAppApiToken");
    const { request } = useHttpRequest();
    const postBooking = await request(
      "https://travel-app-api.up.railway.app/api/v1/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSearch}`,
        },
        body: JSON.stringify(bookingData),
      }
    );
    return postBooking;
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id: string) => {
    const tokenSearch = localStorage.getItem("travelAppApiToken");
    const { request } = useHttpRequest();
    await request(
      `https://travel-app-api.up.railway.app/api/v1/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSearch}`,
        },
      }
    );
    return id;
  }
);
export const clearMessage = createAction("CLEAR_MESSAGE");
