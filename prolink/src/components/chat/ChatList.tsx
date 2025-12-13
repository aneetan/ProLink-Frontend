import { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';

export default function ChatList() {
   const { chats, fetchChats, selectChat } = useChatStore();

   useEffect(() => {
      fetchChats();
   }, [fetchChats]);

  return (
    <div className="h-full overflow-y-auto">
      {chats && (
         <>
         {chats.map((chat) => (
         <button
            key={chat.id}
            onClick={() => selectChat(chat)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
         >
            <div className="flex-1 text-left">
               <p className="font-medium">{chat.otherParticipant.name}</p>
               <p className="text-sm text-gray-500 truncate">
               {chat.lastMessage?.content}
               </p>
            </div>

            {chat.unreadCount ? (
               <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
               {chat.unreadCount}
               </span>
            ) : null}
         </button>
         ))}
      </>)}
    </div>
  );
}
