import { useState, useRef } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/authStore';
import { Paperclip, Send } from 'lucide-react';

export default function MessageInput() {
  const [value, setValue] = useState('');
  const [sending, setSending] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { activeChat, sendMessage } = useChatStore();
  const userId = useAuthStore((s) => s.userId);

  if (!activeChat) return null;

  const receiverId =
    activeChat.participant1Id === userId
      ? activeChat.participant2Id
      : activeChat.participant1Id;

  const handleSend = async () => {
    if ((!value.trim() && attachments.length === 0) || sending) return;

    try {
      setSending(true);
      await sendMessage(receiverId, value, attachments);
      setValue('');
      setAttachments([]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t bg-white p-3">
      {/* Attachment preview */}
      {/* Attachment preview */}
      {attachments.length > 0 && (
      <div className="mb-2 flex gap-2 flex-wrap">
         {attachments.map((file, idx) => (
            <div
            key={idx}
            className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
            >
            📎 {file.name}
            <button
               type="button"
               onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
               className="ml-1 text-gray-500 hover:text-red-500 transition"
               title="Remove attachment"
            >
               ✕
            </button>
            </div>
         ))}
      </div>
      )}


      <div className="flex items-center gap-2">
        {/* Attachment button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          title="Attach file"
        >
            <Paperclip/>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) {
              setAttachments(Array.from(e.target.files));
            }
          }}
        />

        {/* Text input */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
          disabled={sending}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={sending}
          className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            sending
              ? 'bg-[var(--primary-light)] cursor-not-allowed'
              : 'bg-[var(--primary-color)]  hover:bg-[var(--primary-dark)]  text-white'
          }`}
        >
          {sending ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending
            </>
          ) : (
            <Send/>
          )}
        </button>
      </div>
    </div>
  );
}
