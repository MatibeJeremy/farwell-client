"use client";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/app/components/interfaces";

export interface authProps {
    loginLoading: boolean;
    registerLoading: boolean;
    registrationSuccess: boolean;
    loginSuccess: boolean;
    user: IUser | null;
}
const initialState: authProps = {
    loginLoading: false,
    registerLoading: false,
    registrationSuccess: false,
    loginSuccess: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setLoginSuccess: (state, action: PayloadAction<boolean>) => {
            state.loginSuccess = action.payload;
        },
        setRegistrationLoading: (state, action: PayloadAction<boolean>) => {
            state.registerLoading = action.payload;
        },
        setRegistrationSuccess: (state, action: PayloadAction<boolean>) => {
            state.registrationSuccess = action.payload;
        },
        setLoginLoading: (state, action) => {
            state.loginLoading = action.payload;
        },
        clearAuth: (state) => {
            state.loginLoading = false;
            state.loginSuccess = false;
            state.registrationSuccess = false;
            state.user = null;
        },
    },
});

export const {
    setLoginSuccess,
    setLoginLoading,
    setRegistrationLoading,
    setRegistrationSuccess,
    setUserData,
    clearAuth
} = authSlice.actions;

export default authSlice.reducer;
