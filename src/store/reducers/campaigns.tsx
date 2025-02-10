'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICampaign } from '@/app/components/interfaces';

export interface campaignProps {
  campaigns: ICampaign[];
  loading: boolean;
  isCampaignModalOpen: boolean;
  campaignViewObject: ICampaign | null;
}
const initialState: campaignProps = {
  campaigns: [],
  loading: false,
  isCampaignModalOpen: false,
  campaignViewObject: null,
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setIsCampaignModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCampaignModalOpen = action.payload;
    },
    setCampaignViewObject: (state, action: PayloadAction<ICampaign>) => {
      state.campaignViewObject = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCampaigns: (state, action: PayloadAction<ICampaign[]>) => {
      state.campaigns = action.payload;
    },
    clearCampaigns: (state) => {
      state.campaigns = [];
      state.loading = false;
    },
  },
});

export const {
  setCampaigns,
  setLoading,
  clearCampaigns,
  setCampaignViewObject,
  setIsCampaignModalOpen,
} = campaignSlice.actions;

export default campaignSlice.reducer;
