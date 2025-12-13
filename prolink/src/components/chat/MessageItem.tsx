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
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} items-end`}>
      
         {/* Avatar for received messages */}
         {!isMine && (
            <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-br text-xs from-teal-500 to-purple-600 flex items-center justify-center text-white font-semibold">
               {sender.name.charAt(0).toUpperCase()}
            </div>
         )}

         {/* Message bubble */}
         <div
         className={`max-w-xs px-4 py-2 rounded-lg text-sm break-words ${
            isMine ? "bg-[var(--primary-light)] text-white" : "bg-gray-200 text-gray-900"
         }`}
         >
         {message.content}
         </div>

      {/* Placeholder for your own avatar space */}
      {isMine && <div className="w-8 h-8 flex-shrink-0" />}
    </div>
  );
}
