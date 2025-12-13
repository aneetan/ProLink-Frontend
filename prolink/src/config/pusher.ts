import Pusher from "pusher-js";
import { API_URL } from "../utils/url.utils";

export const pusherConfig = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
   authEndpoint: `${API_URL}/chat/pusher/auth`,
   auth: {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   },
   forceTLS: true,
   enabledTransports: ['ws', 'wss'], 
   disabledTransports: ['sockjs'], 
   wsHost: `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
   wsPort: 443,
   wssPort: 443,
});