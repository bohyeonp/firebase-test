import { createSlice} from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        modalDefault : {show : false, type : ""},
        modalConfirm : {show : false, type : ""},
        isLoggedIn : false
    },
    reducers: {
        setModalDefault : (state, action) => {
            state.modalDefault = action.payload;
        },
        setModalConfirm : (state, action) => {
            state.modalConfirm = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});
export const {setModalDefault, setModalConfirm, setIsLoggedIn} = commonSlice.actions;

export const selectModalDefault = state => state.common.modalDefault;
export const selectModalConfirm = state => state.common.modalConfirm;
export const selectIsLoggedIn = state => state.common.isLoggedIn;


const userSlice = createSlice({
    name: "user",
    initialState: {
        userProfile : {},
    },
    reducers: {
        setUserProfile : (state, action) => {
            state.userProfile = action.payload;
        }
    }
});

export const {setUserProfile} = userSlice.actions;

export const selectUserProfile = state => state.user.userProfile;


const postSlice = createSlice({
    name: "post",
    initialState: {
        imageList : []
    },
    reducers: {
        setImageList : (state, action) => {
            state.imageList = action.payload;
        }
    }
});

export const {setImageList} = postSlice.actions;

export const selectImageList = state => state.post.imageList;


export {commonSlice, userSlice, postSlice};
