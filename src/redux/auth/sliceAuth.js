import { createSlice } from "@reduxjs/toolkit";
import { registration, logIn, logOut, refreshUser } from "./operations";

export const authSlice = createSlice({
  name: 'auth',
    initialState: {
        user: { email: null, name: null },
        token: null,
        isRefreshing: false,},

    extraReducers: {
        [registration.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;           
        },
        [logIn.fulfilled](state, action) {
            state.user = action.payload.user; 
            state.token = action.payload.token;
        },
        [logOut.fulfilled](state) {
            state.user = { email: null, name: null };
            state.token = null;
        },
        [refreshUser.pending](state) {
            state.isRefreshing = true; 
        },
        [refreshUser.fulfilled](state, action) {
            state.user = action.payload.user; 
            state.isRefreshing = false; 
        },
        [refreshUser.rejected](state, actions) {
            state.isRefreshing = false; 
        }
    }
    
});

export const authReducer = authSlice.reducer;