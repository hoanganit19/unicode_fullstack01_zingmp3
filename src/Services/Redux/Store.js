import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../../Pages/Auth/authSlice";
import { playerReducer } from "../../Components/Player/playerSlice";

const rootReducer = {
  auth: authReducer,
  player: playerReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
