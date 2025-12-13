import { useAuthStore } from "../../store/authStore";
import type { ChatMessage, ChatParticipant } from "../../types/chat.type";

interface Props {
  message: ChatMessage;
  sender: ChatParticipant; // Sender info (name, avatar if you have it)
}

export default function MessageItem({ message, sender }: Props) {

  const currentUserId = useAuthStore((s) => s.userId);
  if (!currentUserId) return null;

  const isMine = message.senderId === currentUserId;


  return (
     <div
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      {/* Avatar for other user */}
      {!isMine && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center mr-2">
          {sender.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div
        className={` flex gap-2 max-w-xs px-4 py-2 rounded-lg text-sm cursor-pointer
          ${isMine ? "bg-[var(--primary-light)] text-gray-50" : "bg-gray-300 text-gray-600"}`}
      >
        {message.content}

        {/* Status indicator for sender */}
        {isMine && (
          <div className="text-[10px] text-gray-300 mt-1 text-right">
            {message.status === "SENT" && "✓"}
            {message.status === "DELIVERED" && "✓✓"}
            {message.status === "READ" && "(seen)"}
          </div>
        )}
      </div>
    </div>
  );
}
