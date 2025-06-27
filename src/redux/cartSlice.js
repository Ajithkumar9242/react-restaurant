import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]")
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload.id)
      if (index >= 0) {
        state.items[index].quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) {
        item.quantity += 1
      }
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload)
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    clearCart: state => {
      state.items = []
      localStorage.setItem("cart", JSON.stringify(state.items))
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
