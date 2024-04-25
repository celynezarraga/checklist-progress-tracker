import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../modules/user/store/userSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store =  configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;