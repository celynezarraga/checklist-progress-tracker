import { configureStore } from "@reduxjs/toolkit";
import checklistReducer from "../modules/checklist/store/checklistSlice";
import userReducer from "../modules/user/store/userSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store =  configureStore({
  reducer: {
    checklist: checklistReducer,
    user: userReducer
  }
});

export default store;