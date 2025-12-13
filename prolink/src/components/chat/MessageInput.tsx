import { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/authStore';

export default function MessageInput() {
  const [value, setValue] = useState('');
  const { activeChat, sendMessage } = useChatStore();
  const userId = useAuthStore((s) => s.userId);

  if (!activeChat) return null;

    const receiverId =
    activeChat.participant1Id === userId
      ? activeChat.participant2Id
      : activeChat.participant1Id;

  const handleSend = async () => {
    if (!value.trim()) return;
    await sendMessage(receiverId, value);
    setValue('');
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
      >
        Send
      </button>
    </div>
  );
}
