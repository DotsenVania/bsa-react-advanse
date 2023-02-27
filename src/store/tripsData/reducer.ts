import { createReducer } from "@reduxjs/toolkit";
import { getTripsData, getTripsDataId } from "./action";

const initialState = {
  loadingData: false,
  tripsData: [],
  tripsDataId: {},
  error: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getTripsData.pending, (state) => {
    state.loadingData = true;
    state.error = false;
  });
  builder.addCase(getTripsData.fulfilled, (state, action) => {
    state.loadingData = false;
    state.error = false;
    state.tripsData = action.payload;
  });
  builder.addCase(getTripsData.rejected, (state) => {
    state.loadingData = false;
    state.error = true;
  });

  builder.addCase(getTripsDataId.pending, (state) => {
    state.loadingData = true;
    state.error = false;
  });
  builder.addCase(getTripsDataId.fulfilled, (state, action) => {
    state.loadingData = false;
    state.error = false;
    state.tripsDataId = action.payload;
  });
  builder.addCase(getTripsDataId.rejected, (state) => {
    state.loadingData = false;
    state.error = true;
  });
});
