//? We cannot simply setup in our current reducers for async actions
//? We will use createAsyncThunk to handle async functionality
//? grab the createAsyncThunk
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'
import cartItems from '../../cartItems'
//! Think of slice as feature of the application
//! When we look at final of the project we got cart feature and there is modal feature so we have 1 feature for the modal and 1 feature for the cart and in redux toolkit these are named as slice...
//! Common convention is to setup features folder

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

//? Below we will invoke and we want to export result directly.
//? createAsyncThunk looking two things...
//? 1) action type --> name of our action
//? 2) callback --> function need to be return promise
export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((error) => console.log(error))
})

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
    removeItem: (state, action) => {
      console.log(action)
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      //! In this case payload is an object so we go with payload.id
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      //! use it in the App.js with useEffect...
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: (builder) => {
    //? Callback return lifecycle actions
    //? We will create extraReducers with using builder callback notation...
    //? In each addCase we will reach the lifecycle actions.
    builder
      .addCase(getCartItems.pending, (state) => {
        //? what we wanna do in pending
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        //? What we wanna do with data that we return in case of success in this case response of JSON
        //? What is in the action ? It is a payload and that is the data that we are getting back.
        //console.log(action)
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state) => {
        //? In case of rejected what we wanna do
        state.isLoading = false
      })
  },
})

//! In the console there is a cartSlice object appeared and it got a property called "reducer" which will control the state.
//! That is why we wanna export it...
console.log(cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions
export default cartSlice.reducer
