// import { configureStore } from "@reduxjs/toolkit"
// import cartReducer from "./cartSlice"


// export const store = configureStore({
  //   reducer: {
    //     cart: cartReducer,
    //     location: locationReducer
    //   }
    // })
    import { configureStore, createSlice } from "@reduxjs/toolkit";
    import locationReducer from "./locationSlice"

// Load from localStorage
const loadCart = () => {
  try {
    const serialized = localStorage.getItem("cart");
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    return [];
  }
};

// Save to localStorage
const saveCart = (cart) => {
  try {
    const serialized = JSON.stringify(cart);
    localStorage.setItem("cart", serialized);
  } catch (e) {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
    isOpen: false
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    }
  }
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setIsOpen
} = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
     location: locationReducer, 
  }
});

// Persist on state change
store.subscribe(() => {
  saveCart(store.getState().cart.items);
});
