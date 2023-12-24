import { createSlice } from "@reduxjs/toolkit";
import { registration, logIn, logOut, refreshUser } from "./operations";

export const authSlice = createSlice({
  name: 'auth',
    initialState: {
        email: null,
        token: null,
        isRefreshing: false,
    },

    extraReducers: {
        [registration.fulfilled](state, action) {
            console.dir(action.payload);
            state.email = action.payload.email;
            state.token = action.payload.token;           
        },
        [logIn.fulfilled](state, action) {
            state.email = action.payload.email; 
            state.token = action.payload.token;
        },
        [logOut.fulfilled](state) {
            state.email =  null;
            state.token = null;
        },
        [refreshUser.pending](state) {
            state.isRefreshing = true; 
        },
        [refreshUser.fulfilled](state, action) {
            state.email = action.payload.email; 
            state.isRefreshing = false; 
        },
        [refreshUser.rejected](state, actions) {
            state.isRefreshing = false; 
        }
    }
    
});

export const authReducer = authSlice.reducer;