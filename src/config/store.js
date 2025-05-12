import { configureStore } from "@reduxjs/toolkit";
import { userCartSlice } from "../utils/userCartSlice";

export const store = configureStore({
        reducer: {
                cart: userCartSlice.reducer
        },
        devTools: true
})

