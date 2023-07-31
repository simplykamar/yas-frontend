import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  customer:null,
  orderItems:null,
  address:null,
 }

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder(state,action) {
      if(action.payload.address)
        state.address = action.payload.address;      
      else
        state.customer = action.payload.user;      
        state.orderItems = action.payload.orderItems;      
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