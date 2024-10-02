import admin from "firebase-admin";

export const sendPushNotification = (token, payload) => {
  admin.messaging().sendToDevice(token, payload)
    .then(response => {
      console.log("Notification sent successfully:", response);
    })
    .catch(error => {
      console.log("Error sending notification:", error);
    });
};
