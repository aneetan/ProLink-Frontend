import { useChatStore } from '../../store/useChatStore';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

export default function ChatWindow() {
  const { activeChat } = useChatStore();

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-3 font-medium">
        {activeChat.otherParticipant.name}
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <MessageInput />
    </div>
  );
}
