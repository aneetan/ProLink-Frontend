import { create } from "zustand";
import type { Chat, ChatMessage } from "../types/chat.type";
import { chatService } from "../api/chat.api";

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: ChatMessage[];
  loading: boolean;

  openChatWithUser: (otherUserId: number) => Promise<void>;
  fetchChats: () => Promise<void>;
  selectChat: (chat: Chat) => Promise<void>;
  sendMessage: (receiverId: number, content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
   chats: [],
  activeChat: null,
  messages: [],
  loading: false,

   /**
      * Opens a chat room with another user.
      * If chat does not exist, backend creates it.
      */
   openChatWithUser: async (otherUserId) => {
      set({ loading: true });

      // 1. Create or fetch chat room
      const chat = await chatService.getOrCreateChat(otherUserId);

      // 2. Load chat messages
      const messages = await chatService.getMessages(chat.id);

      set({
         activeChat: chat,
         messages,
         loading: false,
      });
   },

   // Load all chats for sidebar
  fetchChats: async () => {
    set({ loading: true });
    const chats = await chatService.getChats();
    set({ chats, loading: false });
  },

   // Select chat & load messages
  selectChat: async (chat) => {
    set({ activeChat: chat, loading: true });
    const messages = await chatService.getMessages(chat.id);
    set({ messages, loading: false });
  },

   // Send message & update UI optimistically
  sendMessage: async (receiverId, content) => {
    const activeChat = get().activeChat;
    if (!activeChat) return;

    const response = await chatService.sendMessage({
      receiverId,
      content,
    });

    set((state) => ({
      messages: [...state.messages, response.message],
    }));
  },
}));