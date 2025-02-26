"use client";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/app/components/interfaces";

export interface authProps {
    loginLoading: boolean;
    registerLoading: boolean;
    registrationSuccess: boolean;
    loginSuccess: boolean;
    user: IUser | null;
    profileLoading: boolean;
    verificationToken: string;
    verificationSuccess: boolean;
}
const initialState: authProps = {
    loginLoading: false,
    registerLoading: false,
    registrationSuccess: false,
    loginSuccess: false,
    user: null,
    profileLoading: false,
    verificationToken: '',
    verificationSuccess: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setVerificationSuccess:(state, action:PayloadAction<boolean>) =>{
            state.verificationSuccess = action.payload;
        },
        setVerificationToken:(state, action: PayloadAction<string>) => {
            state.verificationToken = action.payload;
        },
        setProfileLoading:(state, action:PayloadAction<boolean>) =>{
            state.profileLoading = action.payload;
        },
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
    setVerificationSuccess,
    setVerificationToken,
    setLoginLoading,
    setRegistrationLoading,
    setRegistrationSuccess,
    setUserData,
    clearAuth,
    setProfileLoading
} = authSlice.actions;

export default authSlice.reducer;
