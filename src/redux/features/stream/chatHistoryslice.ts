import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export type THistory = {
  id: number;
  sender: "user" | "ai"; // More specific type if possible
  created_at: string; // Consider using Date type or ISO string
  content: string;
};

type TChatId = number | null;
const initialState: {
  history: THistory[];
  chatId: TChatId;
  newChat: boolean;
  historyLoading: boolean;
} = {
  history: [],
  chatId: null,
  newChat: true,
  historyLoading: false,
};

export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    setNewChatToHistory: (
      state,
      action: PayloadAction<{
        prompt: string;
        response: string;
        chatId: number;
      }>
    ) => {
      const { prompt, response } = action.payload;
      const currentISODate = new Date().toISOString(); // Ensure this is defined

      const conversationData: THistory[] = [
        {
          id: Date.now(),
          sender: "user",
          content: prompt,
          created_at: currentISODate,
        },
        {
          id: Date.now() + 1,
          sender: "ai",
          content: response,
          created_at: currentISODate,
        },
      ];
      state.history = state.history.concat(conversationData);
    },
    setChatIdToPrompt: (state, action) => {
      state.chatId = action.payload;
      // console.log(action.payload);
    },
    setNewChat: (state, action) => {
      state.newChat = action.payload;
      if(action.payload === true) {
        state.history = []
        state.chatId = null;
      }
    },
    setHistoryLoading: (state, action) => {
      state.historyLoading = action.payload;
    },
    setChatToHistory: (state, action) => {
      state.history = action.payload
    }
  },
});

export default chatHistorySlice.reducer;

export const {
  setNewChatToHistory,
  setNewChat,
  setChatIdToPrompt,
  setHistoryLoading,
  setChatToHistory
} = chatHistorySlice.actions;
