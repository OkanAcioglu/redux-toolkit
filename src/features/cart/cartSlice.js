import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'
//! Think of slice as feature of the application
//! When we look at final of the project we got cart feature and there is modal feature so we have 1 feature for the modal and 1 feature for the cart and in redux toolkit these are named as slice...
//! Common convention is to setup features folder

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      //console.log(state)
      //! We call it clearCart and as a parameter this function gets a state and note that we do not have to return anythink
      //! Immer Library behind the scenes does all the heavy lifting
      //! Here we can modify (mutuate) the state directly
      state.cartItems = []
      //??? As an alternative we can return a new state from the reducer.
      //??? We need to be aware of that whatever we will return from reducer as a new state will become the new state.
      // return {} --> our state turn into empty array
      // return {cartItems: []} --> cartItems will be empty but other state values also be gone...
    },
  },
})

//! In the console there is a cartSlice object appeared and it got a property called "reducer" which will control the state.
//! That is why we wanna export it...
console.log(cartSlice)

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
