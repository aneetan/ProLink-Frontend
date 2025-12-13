import { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/useChatStore';
import MessageItem from './MessageItem';
import { useAuthStore } from '../../store/authStore';

export default function MessageList() {
  const { messages, activeChat, markChatAsRead } = useChatStore();
  const bottomRef = useRef<HTMLDivElement | null>(null);
   const userId = useAuthStore((s) => s.userId);

  // 🔽 Auto scroll when messages change
   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

    useEffect(() => {
    if (!activeChat || !userId) return;

    const unreadIds = messages
      .filter(
        (m) =>
          m.senderId !== userId &&
          !m.readBy.includes(userId)
      )
      .map((m) => m.id);

    if (unreadIds.length > 0) {
      markChatAsRead(activeChat.id, unreadIds);
    }
  }, [messages, activeChat, userId]);

  if (!activeChat) return null;

  const getSender = (message) => 
    message.senderId === activeChat.participant1Id
      ? activeChat.participant1
      : activeChat.participant2;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          sender={getSender(msg)}
        />
      ))}
    </div>
  );
}
