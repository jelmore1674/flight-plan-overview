import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsAction {
  hasFlightFactor: boolean;
}

const initialState: SettingsAction = {
  hasFlightFactor: false
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateHasFlightFactor: (
      state,
      action: PayloadAction<{ hasFlightFactor: boolean }>
    ) => ({
      ...state,
      ...action.payload
    })
  }
});

// Action creators are generated for each case reducer function
export const { updateHasFlightFactor } = settingsSlice.actions;

export default settingsSlice.reducer;
