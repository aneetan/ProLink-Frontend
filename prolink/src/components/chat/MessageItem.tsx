import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import type { ChatMessage, ChatParticipant } from "../../types/chat.type";

interface Props {
  message: ChatMessage;
  sender: ChatParticipant; // Sender info (name, avatar if you have it)
  onClick?: (msgId: number) => void;
}

export default function MessageItem({ message, sender, onClick }: Props) {
  const [clicked, setClicked] = useState(false);

  const currentUserId = useAuthStore((s) => s.userId);
  if (!currentUserId) return null;

  const isMine = message.senderId === currentUserId;

    // Tailwind classes based on status
  const bgColor = isMine
    ? message.status === "READ"
      ? "bg-green-500"
      : message.status === "DELIVERED"
      ? "bg-blue-400"
      : "bg-blue-500"
    : message.status === "READ"
    ? "bg-gray-200"
    : "bg-gray-300";

  const textColor = isMine ? "text-white" : "text-gray-900";

  return (
     <div
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
      onClick={() => {
        setClicked(true);
        if (onClick) onClick(message.id);
      }}
    >
      {/* Avatar for other user */}
      {!isMine && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center mr-2">
          {sender.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div
        className={` flex gap-2 max-w-xs px-4 py-2 rounded-lg text-sm cursor-pointer ${bgColor} ${textColor} ${
          clicked ? "ring-2 ring-yellow-300" : ""
        }`}
      >
        {message.content}

        {/* Status indicator for sender */}
        {isMine && (
          <div className="text-[10px] text-gray-300 mt-1 text-right">
            {message.status === "SENT" && "✓"}
            {message.status === "DELIVERED" && "✓✓"}
            {message.status === "READ" && "✓✓ (seen)"}
          </div>
        )}
      </div>
    </div>
  );
}
