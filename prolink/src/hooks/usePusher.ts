import { pusher } from "../config/pusher";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";


export function usePusher(userId: number) {
  const updatePresence = useChatStore((s) => s.setPresence);

  useEffect(() => {
    const pusherConfig = pusher;

    // Subscribe to presence channel
    const channel = pusherConfig.subscribe("presence-chat");

    // Listen for other users' presence updates
    channel.bind("user-presence", (data: { userId: number; isOnline: boolean; lastSeen: string }) => {
      updatePresence({
        userId: data.userId,
        isOnline: data.isOnline,
        lastSeen: data.lastSeen,
      });
    });

    // Notify server this user is online
    channel.bind("pusher:subscription_succeeded", () => {
      pusherConfig.send_event("client-user-online", { userId });
    });

    // Cleanup
    return () => {
      pusherConfig.unsubscribe("presence-chat");
      pusherConfig.disconnect();
    };
  }, [userId, updatePresence]);
}
