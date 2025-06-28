import { createSlice } from "@reduxjs/toolkit";

const saved = typeof window !== "undefined" && localStorage.getItem("location")
  ? JSON.parse(localStorage.getItem("location"))
  : null;

const initialState = saved || {
  type: "delivery",
  data: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.type = action.payload.type;
      state.data = action.payload.data;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "location",
          JSON.stringify({
            type: state.type,
            data: state.data,
          })
        );
      }
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
