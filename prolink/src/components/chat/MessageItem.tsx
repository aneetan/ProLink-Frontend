import { useAuthStore } from "../../store/authStore";
import type { ChatMessage } from "../../types/chat.type";

interface Props {
  message: ChatMessage;
}

export default function MessageItem({ message }: Props) {
   const currentUserId = useAuthStore((s) => s.userId);
    if (!currentUserId) return null;

    const isMine = message.senderId === currentUserId;

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isMine
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
