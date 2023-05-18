import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../app/localStorage';
import { RootState } from '../../app/store';
import { User } from '../../app/types';

const initialState: User = {
  idInstance: loadState(),
  apiTokenInstance: loadState(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      saveState({
        idInstance: payload.idInstance,
        apiTokenInstance: payload.apiTokenInstance,
      });

      return {
        ...state,
        idInstance: payload.idInstance,
        apiTokenInstance: payload.apiTokenInstance,
      };
    },
    logout(state) {
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
export const selectUser = (state: RootState) => state.auth;
