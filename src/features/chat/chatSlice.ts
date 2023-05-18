import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, ChatItem, Message } from '../../app/types';
import type { RootState } from '../../app/store';
import { loadState } from '../../app/localStorage';
import { BASE_URL } from '../../config';

interface ChatData {
  chatList: ChatItem[] | [];
  activeChat: string;
  error: string;
}

interface MessageData {
  user: User;
  phoneNumber: string;
  message: string;
}

interface FetchError {
  message: string;
}

export const sendMessage = createAsyncThunk<
  string,
  MessageData,
  { rejectValue: FetchError }
>(
  'chat/sendMessage',
  async (data: MessageData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}waInstance${data.user.idInstance}/SendMessage/${data.user.apiTokenInstance}`,
        {
          chatId: `${data.phoneNumber}@c.us`,
          message: data.message,
        },
      );

      if (response.status === 200) {
        return data.message;
      }

      return response.statusText;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: 'Failed to send message!' });
    }
  }
);

export const loadMessages = createAsyncThunk<
  any,
  User,
  { rejectValue: FetchError }
>(
  'chat/loadMessages',
  async (data: User, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}waInstance${data.idInstance}/ReceiveNotification/${data.apiTokenInstance}`
      );

      if (response.data && response.data.receiptId) {
        await axios.delete(
          `${BASE_URL}waInstance${data.idInstance}/DeleteNotification/${data.apiTokenInstance}/${response.data.receiptId}`
        );
      }
      console.log('load');
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
      return response.statusText;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: 'Failed to load messages!' });
    }
  }
)

const initialState: ChatData = {
  chatList: loadState() || [],
  activeChat: loadState(),
  error: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, { payload }) {
      const newChat: ChatItem = {
        phoneNumber: payload,
        messages: [],
      }
      const oldChat = state.chatList.find(
        ({ phoneNumber }) => phoneNumber === payload
      );

      state.chatList = oldChat ? state.chatList : [...state.chatList, newChat];
    },
    deleteChat(state, action) {
      const deletedChat = action.payload;

      state.chatList = state.chatList.filter(
        ({ phoneNumber }) => phoneNumber !== deletedChat
      );

      if (state.activeChat === deletedChat) {
        state.activeChat = '';
      }
    },
    setActiveChat(state, { payload }) {
      if (state.activeChat === payload) {
        state.activeChat = '';
      }
      state.activeChat = payload;
    },
    emptyErrorMessage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const newMessage: Message = {
        text: action.payload,
        isMine: true,
      };
      const activeChat = state.chatList.find(
        ({ phoneNumber }) => phoneNumber === state.activeChat
      );

      activeChat!.messages = [...activeChat!.messages, newMessage];
    });
    builder.addCase(sendMessage.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
    });
    builder.addCase(loadMessages.fulfilled, (state, { payload }) => {
      console.log('load fulfilled');
      console.log(state, payload);
      if (!payload) return state;

      const senderChatId = payload.body.senderData.chatId.replace(/@c.us/, '');
      const senderMessage = payload.body.messageData.textMessageData.textMessage;

      const newMessage: Message = {
        text: senderMessage,
        isMine: false,
      };
      const activeChat = state.chatList.find(
        ({ phoneNumber }) => phoneNumber === senderChatId
      );

      activeChat!.messages = [...activeChat!.messages, newMessage];
    });
    builder.addCase(loadMessages.rejected, (state, { payload }) => {
      console.log('rejected');
      console.log(payload);
      if (payload) state.error = payload.message;
    });
  },
});

export const {
  addChat,
  deleteChat,
  setActiveChat,
  emptyErrorMessage,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectActiveChat = (state: RootState) => state.chat.activeChat;
export const selectError = (state: RootState) => state.chat.error;
