import { configureStore } from "@reduxjs/toolkit";

import {commonSlice} from "./slice";

const store = configureStore({
    reducer:{
        common : commonSlice.reducer
    }
});

export default store;
