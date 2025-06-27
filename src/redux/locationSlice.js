
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  type: "delivery", // default
  data: ""          // the address string
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.type = action.payload.type
      state.data = action.payload.data
    }
  }
})

export const { setLocation } = locationSlice.actions
export default locationSlice.reducer
