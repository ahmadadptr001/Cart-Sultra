import { createSlice } from "@reduxjs/toolkit";

export const userCartSlice = createSlice({
        name: "cart",
        initialState: {
                product: [],
        },
        reducers: {
                addToCart: (state, action) => {
                        const isProductExist = state.product.find((item) => item.id === action.payload.id);
                        if (isProductExist) {
                                isProductExist.count++
                                isProductExist.total_price*=isProductExist.count;
                                return
                        }

                        state.product.push({...action.payload, count:1, total_price: action.payload.price})
                },
                decrementCart: (state, action) => {
                        const itemDecrement = state.product.find((item) => item.id === action.payload.id);
                        itemDecrement.count--;
                        itemDecrement.total_price = itemDecrement.count * itemDecrement.price;
                        
                        if (itemDecrement.count <= 1) {
                                state.product = state.product.filter((item) => item.count !== 0);
                                return
                        }

                },
                incerementCart: (state, action) => {
                        const itemIncrement = state.product.find((item) => item.id === action.payload.id);
                        itemIncrement.count++;

                        itemIncrement.total_price = itemIncrement.count*itemIncrement.price;
                },
                deleteCart: (state,action) => {
                        state.product = state.product.filter((item) => item.id !== action.payload.id);
                }
        }
});

export const { addToCart, decrementCart, incerementCart, deleteCart } = userCartSlice.actions;
export default userCartSlice.reducer;