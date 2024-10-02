import { messaging } from "../../server/config/firebaseConfig.json";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

const Notification = () => {
  useEffect(() => {
    getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" })
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token: ", currentToken);
        }
      })
      .catch((err) => console.error("FCM Error: ", err));

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, []);

  return null;
};

export default Notification;
