import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import useHttpRequest from "../../hooks/useHttpRequest";

export const changeToken = createAction<{ status: boolean } | undefined>(
  "TRIPS_CHANGE_TOKEN"
);

export const clearError = createAction("CLEAR_ERROR");

export const auth = createAsyncThunk("auth/auth", async (dataAuth: any) => {
  const { request } = useHttpRequest();
  const data = await request(
    "https://travel-app-api.up.railway.app/api/v1/auth/sign-in",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataAuth),
    }
  );
  localStorage.setItem("travelAppApiToken", data.token);

  return data;
});

export const userData = createAsyncThunk("auth/userData", async () => {
  const tokenSearch = localStorage.getItem("travelAppApiToken");
  const { request } = useHttpRequest();
  const data = await request(
    "https://travel-app-api.up.railway.app/api/v1/auth/authenticated-user",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenSearch}`,
      },
    }
  );
  return data;
});

export const registration = createAsyncThunk(
  "auth/registration",
  async (dataRegistration: any) => {
    const { request } = useHttpRequest();
    const data = await request(
      "https://travel-app-api.up.railway.app/api/v1/auth/sign-up",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataRegistration),
      }
    );
    localStorage.setItem("travelAppApiToken", data.token);
    return data;
  }
);
