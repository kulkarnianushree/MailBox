import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth";
import MailSlice from "./mail";
const Store = configureStore({
    reducer:{
        auth:AuthSlice.reducer,
        mail:MailSlice.reducer
    }
})
export default Store