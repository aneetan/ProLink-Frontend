export interface ChatParticipant {
  id: number;
  name: string;
  email: string;
  isOnline?: boolean;
  lastSeen?: string | null;
  role: string;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  attachments: string[];
  readBy: number[];
  createdAt: string;
}

export interface Chat {
  id: number;
  participant1Id: number;
  participant2Id: number;
  participant1: ChatParticipant;
  participant2: ChatParticipant;
  otherParticipant: ChatParticipant;
  lastMessage?: ChatMessage;
  unreadCount?: number;
}

export interface SendMessageDto {
  receiverId: number;
  content: string;
  attachments?: File[];
}

export interface MarkAsReadDto {
  chatId: number;
  messageIds: number[];
}
