import { create } from "zustand";
import type { Chat, ChatMessage, UserPresence } from "../types/chat.type";
import { chatService } from "../api/chat.api";

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: ChatMessage[];
  loading: boolean;
  presences: Record<number, UserPresence>; 
  typingUsers: Record<number, boolean>; 

  openChatWithUser: (otherUserId: number) => Promise<void>;
  fetchChats: () => Promise<void>;
  selectChat: (chat: Chat) => Promise<void>;
  sendMessage: (receiverId: number, content: string, attachments?: File[]) => Promise<void>;
  setTyping: (userId: number, isTyping: boolean) => void;
  setPresence: (presence: UserPresence) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
   chats: [],
  activeChat: null,
  messages: [],
  loading: false,
  presences: {},
  typingUsers: {},

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
  sendMessage: async (receiverId, content, attachments) => {
    const activeChat = get().activeChat;
    if (!activeChat) return;

    const response = await chatService.sendMessage({
      receiverId,
      content,
      attachments
    });

    set((state) => ({
      messages: [...state.messages, response.message],
    }));
  },

   setTyping(userId, isTyping) {
      set((state) => ({
         typingUsers: { ...state.typingUsers, [userId]: isTyping },
      }));
   },
   
   setPresence(presence) {
      set((state) => ({
         presences: { ...state.presences, [presence.userId]: presence },
      }));
   },
}));