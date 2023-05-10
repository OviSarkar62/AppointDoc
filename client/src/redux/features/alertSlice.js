import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
    user: {
      notification: [],
      seennotification: [],
    },
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setUserNotification: (state, action) => {
      state.user.notification = action.payload;
    },
    setSeenNotification: (state, action) => {
      state.user.seennotification = action.payload;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  setUserNotification,
  setSeenNotification,
} = alertSlice.actions;


