export interface User {
  idInstance: string;
  apiTokenInstance: string;
}

export interface Message {
  text: string;
  isMine: boolean;
}

export interface ChatItem {
  phoneNumber: string;
  messages: Message[];
}
