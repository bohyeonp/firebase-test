import { createSlice} from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        modalDefault : {show : false, type : ""},
        modalConfirm : {show : false, type : ""},
        userProfile : {},
        isLoggedIn : false
    },
    reducers: {
        setModalDefault : (state, action) => {
            state.modalDefault = action.payload;
        },
        setModalConfirm : (state, action) => {
            state.modalConfirm = action.payload;
        },
        setUserProfile : (state, action) => {
            state.userProfile = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const {setModalDefault, setModalConfirm, setUserProfile, setIsLoggedIn} = commonSlice.actions;

export const selectModalDefault = state => state.common.modalDefault;
export const selectModalConfirm = state => state.common.modalConfirm;
export const selectUserProfile = state => state.common.userProfile;
export const selectIsLoggedIn = state => state.common.isLoggedIn;

export {commonSlice};
