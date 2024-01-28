import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimbriefData } from "../../types/simbrief";

interface SimbriefState {
  username: string;
  flightPlan?: SimbriefData;
}

const initialState: SimbriefState = {
  username: ""
};

export const simbriefSlice = createSlice({
  name: "simbrief",
  initialState,
  reducers: {
    updateUsername: (state, action: PayloadAction<{ username: string }>) => ({
      ...state,
      ...action.payload
    }),
    updateFlightPlan: (
      state,
      action: PayloadAction<{ flightPlan: SimbriefData }>
    ) => ({
      ...state,
      ...action.payload
    })
  }
});

// Action creators are generated for each case reducer function
export const { updateUsername,updateFlightPlan } = simbriefSlice.actions;

export default simbriefSlice.reducer;
