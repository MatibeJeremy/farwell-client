import {AnyAction, Dispatch, UnknownAction} from "redux";
import {ILoginUser, UserFormData} from "@/app/components/interfaces";
import axios from "axios";
import {toast} from "react-toastify";
import {
    authProps,
    clearAuth,
    setLoginLoading,
    setLoginSuccess, setProfileLoading,
    setRegistrationLoading,
    setRegistrationSuccess,
    setUserData, setVerificationSuccess, setVerificationToken
} from "@/store/reducers/auth";
import {campaignProps, clearCampaigns} from "@/store/reducers/campaigns";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {PersistPartial} from "redux-persist/es/persistReducer";


export const activateAccount = (dispatch: Dispatch, token: string) => {
    dispatch(setProfileLoading(true));
    axios
        .get(`http://127.0.0.1:8000/api/activate/${token}`)
        .then((response) => {
            dispatch(setVerificationSuccess(true));
            dispatch(setProfileLoading(false));
            toast.success("Activation success, proceed to log in");
            return response;
        })
        .catch((error) => {
            dispatch(setVerificationSuccess(false));
            dispatch(setProfileLoading(false));
            toast.error(error.response.data.message);
            return error;
        });
}


export const RegisterUser = async (dispatch: Dispatch, payload: UserFormData) => {
    dispatch(setRegistrationLoading(true));
    axios
        .post(`http://127.0.0.1:8000/api/register`, payload)
        .then((response) => {
            dispatch(setRegistrationLoading(false));
            toast.success("User created successfully");
            dispatch(setRegistrationSuccess(true));
            dispatch(setVerificationToken(response.data.activation_token))
            return response;
        })
        .catch((error) => {
            dispatch(setRegistrationLoading(false));
            dispatch(setRegistrationSuccess(false));
            toast.error(error.response.data.email[0] || error.response.data.password[0]);
            return error;
        });
}


export const updateProfileAction = (dispatch: Dispatch, data: { email: string; name: string; }) => {
    dispatch(setProfileLoading(true));
    const token = localStorage.getItem("token");
    axios
        .put(`http://127.0.0.1:8000/api/user/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            dispatch(setProfileLoading(false));
            dispatch(setUserData(response.data.user));
            toast.success("User updated successfully");
            return response;
        })
        .catch((error) => {
            dispatch(setProfileLoading(false));
            toast.error(error.response.data.message);
            return error;
        });
}


export const updatePasswordAction = (data: {
    new_password_confirmation: string | null;
    new_password: string | null;
    current_password: string | null
}) => {
    const token = localStorage.getItem("token");
    axios
        .post(`http://127.0.0.1:8000/api/user/password`, data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            toast.success( "Password updated successfully" );
            return response;
        })
        .catch((error) => {
            toast.error(error.response.data.message);
            return error;
        });
}


export const LoginUser = async (dispatch: Dispatch, payload: ILoginUser) => {
    dispatch(setLoginLoading(true));
    axios
        .post(`http://127.0.0.1:8000/api/login`, payload)
        .then((response) => {
            dispatch(setLoginLoading(false));
            dispatch(setUserData(response.data.user));
            const token = response.data.token;
            localStorage.setItem("token", token);
            toast.success( "User logged in successfully" );
            dispatch(setLoginSuccess(true));
            return response;
        })
        .catch((error) => {
            dispatch(setLoginLoading(false));
            dispatch(setLoginSuccess(false));
            toast.error(error.response.data.message || error.response.message[0]);
            return error;
        });
}

export const LogOutUser = async (dispatch: Dispatch) => {
    dispatch(clearAuth());
    dispatch(clearCampaigns());
    localStorage.removeItem("token");
}