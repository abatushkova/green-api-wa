import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../../app/types";
import { RootState } from "../../app/store";

type ContactNumber = string;
interface IContactsState {
  list: IContact[];
}

const initialState: IContactsState = {
  list: []
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(
      state: IContactsState,
      action: PayloadAction<IContact>
    ) {
      state.list.push(action.payload);
    },
    deleteContact(
      state: IContactsState,
      action: PayloadAction<ContactNumber>
    ) {
      state.list = state.list.filter(({ phoneNumber }) => phoneNumber !== action.payload);
    }
  }
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
export const getContacts = (state: RootState) => state.contacts.list;
