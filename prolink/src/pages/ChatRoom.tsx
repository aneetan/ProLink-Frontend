import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { API_URL } from "../utils/url.utils";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Fetch old messages from backend
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/messages`);
        const data = await res.json();
        setMessages(data); // data already has { message, timestamp }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();

    // Pusher setup
    const pusher = new Pusher("cc75db0cc8f9d6deb340", { cluster: "ap2" });
    const channel = pusher.subscribe("chat-channel");

    // Listen for new messages
    channel.bind("new-message", (data) => {
      setMessages((prev) => [...prev, { message: data.message, timestamp: new Date() }]);
    });

    // Cleanup on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Send message to backend
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });
      setNewMessage(""); // clear input after sending
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      className="chat-room"
      style={{
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 10,
      }}
    >
      <div
        className="messages"
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 5, padding: 6, background: "#f1f1f1", borderRadius: 4 }}>
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", gap: 5 }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "8px 12px", borderRadius: 4, border: "none", background: "#4CAF50", color: "#fff" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
