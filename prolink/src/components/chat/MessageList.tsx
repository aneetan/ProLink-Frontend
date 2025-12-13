import { useChatStore } from '../../store/useChatStore';
import MessageItem from './MessageItem';

export default function MessageList() {
  const { messages, activeChat } = useChatStore();

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
