import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { contactsReducer } from "../features/contacts/contactsSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});
