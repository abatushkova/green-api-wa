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
      };
      const oldChat = state.chatList.find(
        ({ phoneNumber }) => phoneNumber === payload
      );

      if (oldChat) throw new Error();
      state.chatList = [...state.chatList, newChat];
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
    emptyErrorMessage(state) {
      state.error = '';
    },
    emptyChatList(state) {
      state.chatList = [];
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
      if (!payload) return state;

      let senderChatId = state.activeChat;
      let senderMessage = '';

      switch(payload.body.typeWebhook) {
        case 'incomingMessageReceived':
          senderChatId = payload.body.chatId.replace(/@c.us/, '');
          senderMessage = payload.body.messageData.textMessageData.textMessage;
          break;
        case 'outgoingMessageReceived':
          senderChatId = payload.body.senderData.chatId.replace(/@c.us/, '');
          senderMessage = payload.body.messageData.textMessageData.textMessage;
          break;
        default:
          return;
      }

      const newMessage: Message = {
        text: senderMessage,
        isMine: false,
      };
      const selectedChat = state.chatList.find(
        ({ phoneNumber }) => phoneNumber === senderChatId
      );

      selectedChat!.messages = [...selectedChat!.messages, newMessage];
    });
    builder.addCase(loadMessages.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
    });
  },
});

export const {
  addChat,
  deleteChat,
  setActiveChat,
  emptyErrorMessage,
  emptyChatList,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectActiveChat = (state: RootState) => state.chat.activeChat;
export const selectError = (state: RootState) => state.chat.error;
