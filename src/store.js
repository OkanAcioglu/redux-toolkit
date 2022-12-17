//! Think of store as entire state for the app.
import { configureStore } from '@reduxjs/toolkit'
//! Below we will export cartSlice.reducer (we can name it as we want)
import cardReducer from './features/cart/cartSlice'

//! reducer is where we will setup our features
export const store = configureStore({
  reducer: {
    //! naming the key is up to us in this case we will named it as "cart"
    cart: cardReducer,
  },
})
