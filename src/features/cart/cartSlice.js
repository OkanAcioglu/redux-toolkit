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
})

//! In the console there is a cartSlice object appeared and it got a property called "reducer" which will control the state.
//! That is why we wanna export it...
//console.log(cartSlice)

export default cartSlice.reducer
