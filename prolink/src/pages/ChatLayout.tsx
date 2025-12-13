import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white">
        <ChatList />
      </div>

      {/* Chat area */}
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
}
