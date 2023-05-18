import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IChatItem } from "../../app/types";
import { RootState } from "../../app/store";
import { loadState, saveState } from "../../app/localStorage";
import { BASE_URL } from '../../app/appConfig';

interface IChatData {
  chatList: IChatItem[] | [];
  activeChat: string | null;
  error: string | null;
}

interface IChatState {
  user: IUser;
  outPhoneNumber?: string;
  message?: string;
}

const initialState: IChatData = {
  chatList: loadState() || [],
  activeChat: loadState() || null,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(
      state: IChatData,
      action: PayloadAction<string>
    ) {
      const newChat: IChatItem = {
        phoneNumber: action.payload,
        messages: [],
      }

      state.chatList = [...state.chatList, newChat];
    },
    deleteChat(
      state: IChatData,
      action: PayloadAction<string>
    ) {
      const deletedChat = action.payload;

      state.chatList = state.chatList.filter(
        ({ phoneNumber }) => phoneNumber !== deletedChat
      );

      if (state.activeChat === deletedChat) {
        state.activeChat = null;
      }
    },
    setActiveChat(
      state: IChatData,
      action: PayloadAction<string>
    ) {
      if (state.activeChat === action.payload) {
        state.activeChat = null;
      }
      state.activeChat = action.payload;
    },
  }
});

export const {
  addChat,
  deleteChat,
  setActiveChat,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
export const getChatList = (state: RootState) => state.chat.chatList;
export const activeChat = (state: RootState) => state.chat.activeChat;
