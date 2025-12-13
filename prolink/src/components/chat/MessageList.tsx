import { useChatStore } from '../../store/useChatStore';
import MessageItem from './MessageItem';

export default function MessageList() {
  const { messages } = useChatStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages && (
         <>
            {messages.map((msg) => (
               <MessageItem key={msg.id} message={msg} />
            ))}
         </>
      )}
    </div>
  );
}
