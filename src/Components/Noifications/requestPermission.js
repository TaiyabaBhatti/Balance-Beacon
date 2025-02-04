import { messaging } from "../../Configuration/fcm-config";
import { onMessage, getToken } from "firebase/messaging";
import { NotificationPopup } from "./NotificationPopup";

const requestPermission =async ()=> {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    // generate token
    console.log("Notification permission allowed");

    // return "granted";

    const token = await getToken(messaging, {
      vapikey:import.meta.env.VITE_FIREBASE_VAPI_KEY
    });

    console.log(token);
  } else if (permission === "denied") {
    // permisiion denied
    console.log("Notification permission Denied");
    // return "denied";
  }
}


// Foreground Behavior: System-level notifications are not shown when the app is in the foreground. Use this listener to handle and display them in-app.
// Flexibility: You can decide how to display or process the notification (e.g., update UI, trigger animations, log data).

const listenForMessages = () =>{
    //callback=> A user-defined function
onMessage(messaging,(payload) =>{
console.log("Foreground message received:",payload);

// Extracting notification adta
const {title,body} = payload.notification;
NotificationPopup(`${title}: ${body}`,"info");
}
)
}


export {listenForMessages,requestPermission}
