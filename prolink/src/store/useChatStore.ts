import { create } from "zustand";
import type {
  Chat,
  ChatMessage,
  MessageReadEvent,
  UserPresence,
} from "../types/chat.type";
import { chatService } from "../api/chat.api";
import { pusherConfig } from "../config/pusher";
import Pusher, { Channel } from "pusher-js";

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: ChatMessage[];
  loading: boolean;

  // 🔥 Presence
  presences: Record<number, UserPresence>;

  // Pusher
  pusher: Pusher | null;
  chatChannel: Channel | null;
  presenceChannel: Channel | null;

  // Actions
  fetchChats: () => Promise<void>;
  selectChat: (chat: Chat) => Promise<void>;
  openChatWithUser: (otherUserId: number) => Promise<void>;
  sendMessage: (
    receiverId: number,
    content: string,
    attachments?: File[]
  ) => Promise<void>;

  addMessage: (msg: ChatMessage) => void;
  markChatAsRead: (chatId: number, messageIds: number[]) => Promise<void>;

  // 🔥 Presence actions
  updatePresence: (presence: UserPresence) => void;
  subscribeToPresence: () => void;

  subscribeToChat: (chatId: number) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChat: null,
  messages: [],
  loading: false,

  presences: {},

  pusher: null,
  chatChannel: null,
  presenceChannel: null,

  /* ----------------------------------
     BASIC CHAT
  ---------------------------------- */

  fetchChats: async () => {
    set({ loading: true });
    const chats = await chatService.getChats();
    set({ chats, loading: false });
  },

  openChatWithUser: async (otherUserId) => {
    set({ loading: true });

    const chat = await chatService.getOrCreateChat(otherUserId);
    const messages = await chatService.getMessages(chat.id);

    set({
      activeChat: chat,
      messages,
      loading: false,
    });

    get().subscribeToChat(chat.id);
  },

  selectChat: async (chat) => {
    set({ activeChat: chat, loading: true });

    const messages = await chatService.getMessages(chat.id);

    set({ messages, loading: false });
    get().subscribeToChat(chat.id);
  },

  sendMessage: async (receiverId, content, attachments) => {
    await chatService.sendMessage({ receiverId, content, attachments });
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  /* ----------------------------------
     CHAT SUBSCRIPTION
  ---------------------------------- */

  subscribeToChat: (chatId) => {
    const { pusher, chatChannel } = get();

    if (!pusher) {
      set({ pusher: pusherConfig });
    }

    // 🔥 Unsubscribe previous chat
    if (chatChannel) {
      chatChannel.unsubscribe();
    }

    const channel = pusherConfig.subscribe(`chat-${chatId}`);
    set({ chatChannel: channel });

    channel.bind("message-sent", (data: { message: ChatMessage }) => {
      get().addMessage(data.message);
    });

    channel.bind("message-updated", (data: MessageReadEvent) => {
      if (data.type === "READ") {
        set((state) => ({
          messages: state.messages.map((m) =>
            data.messageIds.includes(m.id)
              ? { ...m, status: "READ" }
              : m
          ),
        }));
      }
    });
  },

  /* ----------------------------------
     🔥 PRESENCE (FIXED)
  ---------------------------------- */

  updatePresence: (presence) => {
    set((state) => ({
      presences: {
        ...state.presences,
        [presence.userId]: presence,
      },
    }));
  },

  subscribeToPresence: () => {
    const { presenceChannel } = get();

    // ✅ Subscribe ONLY ONCE
    if (presenceChannel) return;

    const pusher = pusherConfig;
    const channel = pusher.subscribe("presence");

    set({ presenceChannel: channel });

    channel.bind("user-presence-updated", (data: UserPresence) => {
      console.log("Presence update:", data);
      get().updatePresence(data);
    });
  },

  /* ----------------------------------
     READ RECEIPTS
  ---------------------------------- */

  markChatAsRead: async (chatId, messageIds) => {
    try {
      await chatService.markAsRead({ chatId, messageIds });

      set((state) => ({
        messages: state.messages.map((msg) =>
          messageIds.includes(msg.id)
            ? { ...msg, status: "READ" }
            : msg
        ),
      }));
    } catch (err) {
      console.error("Failed to mark messages as read", err);
    }
  },
}));
