import { create } from 'zustand';

export interface Source {
  document_name: string;
  chunk_text: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
