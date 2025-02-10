import {Dispatch} from "redux";
import axios from "axios";
import {toast} from "react-toastify";
import {setCampaigns, setLoading} from "@/store/reducers/campaigns";

export const fetchCampaigns = async (dispatch: Dispatch, token: string | null) => {
    dispatch(setLoading(true));
    axios
        .get(`${process.env.NEXT_PUBLIC_SERVER}/campaigns/influencer`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            dispatch(setLoading(false));
            dispatch(setCampaigns(response.data));
            return response;
        })
        .catch((error) => {
            dispatch(setLoading(false));
            // if(error.response.data.statusCode == 401){
            //     LogOutUser(dispatch);
            // }
            toast.error(error.response.data.message || error.response.message[0]);
            return error;
        });
}