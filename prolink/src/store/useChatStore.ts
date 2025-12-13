import { create } from "zustand";
import type { Chat, ChatMessage, UserPresence } from "../types/chat.type";
import { chatService } from "../api/chat.api";
import { pusherConfig } from "../config/pusher";
import Pusher, { Channel } from "pusher-js";

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: ChatMessage[];
  loading: boolean;
  presences: Record<number, UserPresence>; 
  typingUsers: Record<number, boolean>; 
   pusher?: Pusher;
   channel: Channel | null;

  openChatWithUser: (otherUserId: number) => Promise<void>;
  fetchChats: () => Promise<void>;
  selectChat: (chat: Chat) => Promise<void>;
  sendMessage: (receiverId: number, content: string, attachments?: File[]) => Promise<void>;
  setTyping: (userId: number, isTyping: boolean) => void;
  setPresence: (presence: UserPresence) => void;
   addMessage: (msg: ChatMessage) => void;
  subscribeToChat: (chatId: number) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
   chats: [],
  activeChat: null,
  messages: [],
  loading: false,
  presences: {},
  typingUsers: {},
  pusher: null,
  channel: null,

    // Add a new message to state
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

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

       get().subscribeToChat(chat.id);
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

     get().subscribeToChat(chat.id);
  },

   // Send message & update UI optimistically
  sendMessage: async (receiverId, content, attachments) => {
    const activeChat = get().activeChat;
    if (!activeChat) return;

    await chatService.sendMessage({
      receiverId,
      content,
      attachments
    });
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

   subscribeToChat: (chatId) => {
    const pusher = pusherConfig;
    set({ pusher });

    const channel = pusher.subscribe(`chat-${chatId}`);
     set({ channel });

     // When a new message is sent
      channel.bind("message-sent", (data: { message: ChatMessage }) => {
         get().addMessage(data.message); // Add it to your messages state
      });

      // Presence updates
      channel.bind("presence-updated", (data: UserPresence) => {
         get().setPresence(data);
      });
  },
}));