import { useChatStore } from '../../store/useChatStore';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

export default function ChatWindow() {
  const { activeChat  } = useChatStore();
  const presences = useChatStore((s) => s.presences);


  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  const { otherParticipant } = activeChat;
  const presence = presences[otherParticipant.id];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-md p-1 transition">
          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
            {otherParticipant.name.charAt(0).toUpperCase()}
          </div>

          {/* Name, Role, Status */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{otherParticipant.name}</span>
            <span className="text-xs text-gray-500">{otherParticipant.role}</span>
          </div>

          {/* Online Status Dot */}
          <div
            className={`ml-2 w-3.5 h-3.5 rounded-full border-2 border-white flex-shrink-0 ${
              presence?.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
            }`}
            title={presence?.isOnline ? 'Online' : 'Offline'}
          />

          <span className="text-xs text-gray-500">
            {presence?.isOnline ? "Online" : "Offline"}
         </span>
        </div>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <MessageInput />
    </div>
  );
}
