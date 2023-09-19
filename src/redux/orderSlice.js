import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  // customer:null,
  // orderItems:null,
  address:null,
  giftCard:null,
 }

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder(state,action) {
      console.log("order slice",action.payload)
      if(action.payload.address)
        state.address = action.payload.address;      
      else if(action.payload.giftCard)
        state.giftCard = action.payload.giftCard
      // else
        // state.customer = action.payload.user;      
        // state.orderItems = action.payload.orderItems;      
    },
    clearOrder(state) {
        state.address = null;      
        state.customer = null; 
        state.orderItems = null;
    },
  },
})

export const { addToOrder, clearOrder } = orderSlice.actions
export default orderSlice.reducer