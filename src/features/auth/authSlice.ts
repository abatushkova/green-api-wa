import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../app/localStorage";

interface IAuthState {
  idInstance: string | null;
  apiTokenInstance: string | null;
}

const initialState: IAuthState = {
  idInstance: loadState() || null,
  apiTokenInstance: loadState() || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(
      state: IAuthState,
      action: PayloadAction<IAuthState>
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
    logout(state: IAuthState) {
      saveState({
        idInstance: null,
        apiTokenInstance: null,
      });

      return {
        ...state,
        idInstance: null,
        apiTokenInstance: null,
      }
    },
  }
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
