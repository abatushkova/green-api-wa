import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../app/localStorage";
import { IUser } from "../../app/types";

const initialState: IUser = {
  idInstance: loadState(),
  apiTokenInstance: loadState(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(
      state: IUser,
      action: PayloadAction<IUser>
    ) {
      saveState({
        idInstance: action.payload.idInstance,
        apiTokenInstance: action.payload.apiTokenInstance,
      });

      return {
        ...state,
        idInstance: action.payload.idInstance,
        apiTokenInstance: JSON.stringify(action.payload.apiTokenInstance),
      };
    },
    logout(state: IUser) {
      saveState({
        idInstance: '',
        apiTokenInstance: '',
      });

      return {
        ...state,
        idInstance: '',
        apiTokenInstance: '',
      }
    },
  }
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
