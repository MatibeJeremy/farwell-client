"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "./CustomStorage";
import {thunk} from "redux-thunk";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const persistConfig = {
    key: "trend-client",
    storage,
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
