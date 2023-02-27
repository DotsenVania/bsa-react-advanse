import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import useHttpRequest from "../../hooks/useHttpRequest";
export const getTripsData = createAsyncThunk(
  "trips/get-data",
  async (token: string) => {
    const { request } = useHttpRequest();
    const getData = await request(
      "https://travel-app-api.up.railway.app/api/v1/trips",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return getData;
  }
);

export const getTripsDataId = createAsyncThunk(
  "trips/get-data-id",
  async (id: string) => {
    const tokenSearch = localStorage.getItem("travelAppApiToken");
    const { request } = useHttpRequest();
    const getDataId = await request(
      `https://travel-app-api.up.railway.app/api/v1/trips/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSearch}`,
        },
      }
    );
    return getDataId;
  }
);
