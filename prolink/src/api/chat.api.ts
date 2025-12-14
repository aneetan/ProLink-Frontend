import { api } from "../lib/api";
import type { 
  Chat, 
  ChatMessage, 
  MarkAsReadDto, 
  PresenceUpdateDto, 
  SendMessageDto,
  UserPresence
} from "../types/chat.type";

export const chatService = {
  // Get user's chats
  async getChats(): Promise<Chat[]> {
    const response = await api.get('/chat/chats');
    return response.data.data;
  },

  // Get or create chat with another user
  async getOrCreateChat(otherUserId: number): Promise<Chat> {
    const response = await api.get(`/chat/chat/${otherUserId}`);
    return response.data;
  },

  // Get chat messages
  async getMessages(chatId: number, page: number = 1, limit: number = 50): Promise<ChatMessage[]> {
    const response = await api.get(`/chat/chat/${chatId}/messages`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  // Send message
  async sendMessage(data: SendMessageDto): Promise<{ message: ChatMessage; chatId: number; receiverOnline: boolean }> {
    const response = await api.post('/chat/message/send', data);
    return response.data;
  },

  // Mark messages as read
  async markAsRead(data: MarkAsReadDto): Promise<{ success: boolean; count: number }> {
    const response = await api.put("/chat/messages/read", { data });
    return response.data;
  },

  // Update user presence
  async updatePresence(data: PresenceUpdateDto): Promise<{ success: boolean; presence: UserPresence }> {
    const response = await api.post('/chat/presence', data);
    return response.data;
  },

  // // Get user presence
  // async getPresence(userIds?: number[]): Promise<UserPresence[]> {
  //   const params = userIds ? { userIds: userIds.join(',') } : {};
  //   const response = await api.get('/chat/presence', { params });
  //   return response.data;
  // },

  // Pusher authentication
  async authenticatePusher(socketId: string, channelName: string) {
    const response = await api.post('/chat/pusher/auth', {
      socket_id: socketId,
      channel_name: channelName,
    });
    return response.data;
  }
};