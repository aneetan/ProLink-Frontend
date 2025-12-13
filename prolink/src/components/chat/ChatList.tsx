import { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/authStore';

export default function ChatList() {
  const { chats, fetchChats, selectChat, activeChat } = useChatStore();
  const currentUserId = useAuthStore((s) => s.userId);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="search"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Chat List */}
      {chats.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {chats.map((chat) => {
            const isSelected = activeChat?.id === chat.id;
            const lastMessage = chat.lastMessage;
            const hasUnread = chat.unreadCount && chat.unreadCount > 0;

            return (
              <button
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`w-full px-4 py-4 flex items-center gap-4 transition-colors ${
                  isSelected
                    ? 'bg-teal-50'
                    : hasUnread
                    ? 'bg-teal-300 hover:bg-teal-200'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {chat.otherParticipant.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Online Indicator */}
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      chat.otherParticipant.isOnline ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <p
                      className={`font-semibold truncate ${
                        isSelected ? 'text-teal-600' : 'text-gray-900'
                      }`}
                    >
                      {chat.otherParticipant.name}
                    </p>

                    {/* Unread Count */}
                  {chat.unreadCount > 0 && (
                     <span className="ml-2 w-5 h-5 text-sm font-semibold flex items-center justify-center bg-red-400 text-white rounded-full">
                        {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                     </span>
                  )}


                  </div>

                  {/* Last Message */}
                  <p
                    className={`text-sm truncate ${
                      hasUnread ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {lastMessage ? (
                      <>
                        {lastMessage.senderId === currentUserId && (
                          <span className="text-gray-400 mr-1">You:</span>
                        )}
                        {lastMessage.content}
                      </>
                    ) : (
                      <span className="italic text-gray-400">Start a conversation</span>
                    )}
                  </p>

                  {lastMessage && (
                    <span className="text-xs text-gray-400 float-end">
                      {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No conversations yet
          </h3>
          <p className="text-gray-500 text-sm">
            Start a conversation to see chats here
          </p>
        </div>
      )}
    </div>
  );
}
