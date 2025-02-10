import {Dispatch} from "redux";
import {ILoginUser, UserFormData} from "@/app/components/interfaces";
import axios from "axios";
import {toast} from "react-toastify";
import {
    clearAuth,
    setLoginLoading,
    setLoginSuccess, setProfileLoading,
    setRegistrationLoading,
    setRegistrationSuccess,
    setUserData
} from "@/store/reducers/auth";
import {clearCampaigns} from "@/store/reducers/campaigns";

export const RegisterUser = async (dispatch: Dispatch, payload: UserFormData) => {
    dispatch(setRegistrationLoading(true));
    axios
        .post(`http://127.0.0.1:8000/api/register`, payload)
        .then((response) => {
            dispatch(setRegistrationLoading(false));
            toast.success( "User created successfully" );
            dispatch(setRegistrationSuccess(true));
            return response;
        })
        .catch((error) => {
            dispatch(setRegistrationLoading(false));
            dispatch(setRegistrationSuccess(false));
            toast.error(error.response.data.email[0] || error.response.data.password[0] );
            return error;
        });
}


export const updateProfileAction = (dispatch: Dispatch, data: any) => {
    dispatch(setProfileLoading(true));
    const token = localStorage.getItem("token");
    axios
        .put(`http://127.0.0.1:8000/api/user/update`, data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            dispatch(setProfileLoading(false));
            dispatch(setUserData(response.data.user));
            toast.success( "User updated successfully" );
            return response;
        })
        .catch((error) => {
            dispatch(setProfileLoading(false));
            toast.error(error.response.data.message);
            return error;
        });
}


export const updatePasswordAction = (dispatch: Dispatch, data: any) => {
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