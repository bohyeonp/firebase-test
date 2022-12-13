import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userInfo",
    initialState: {
        userProfile : {
            displayName : "",
            email : "",
            photoURL : ""
        },
        isLoggedIn : false
    },
    reducers: {
        setUserProfile : (state, action) => {
            state.userProfile = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const {setUserProfile, setIsLoggedIn} = userSlice.actions;

export const selectUserProfile = state => state.userInfo.userProfile;
export const selectIsLoggedIn = state => state.userInfo.isLoggedIn;

export {userSlice};
