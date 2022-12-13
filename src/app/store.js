import { configureStore } from "@reduxjs/toolkit";

import {userSlice} from "./slice";

const store = configureStore({
    reducer:{
        userInfo : userSlice.reducer
    }
});

export default store;
