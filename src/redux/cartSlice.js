import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  products: [],
 }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state,action) {
      const item = state.products.find(item=>item.id===action.payload.id)
      if(item){
        item.quantity = action.payload.quantity+1;
      }
      else{
        state.products.push(action.payload);
      }
    },
    removeFromCart(state,action) {
      const item = state.products.find(item=>item.id===action.payload.id)
      if(item){
        item.quantity = Math.max(action.payload.quantity-1,1);
      }
      else{
        state.products.push(action.payload);
      }
    },
     deleteFromCart(state,action) {
        state.products = state.products.filter(item=>item.id!==action.payload.id)
    },
    resetCart(state) {
            state.products = [];
    },
    updateCart(state,action) {
            state.products = action.payload;
    },
  },
})

export const { addToCart, removeFromCart, resetCart, deleteFromCart,updateCart } = cartSlice.actions
export default cartSlice.reducer