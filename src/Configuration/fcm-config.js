import app from "./firebase-config";
import {getMessaging} from "firebase/messaging";

// reference to the service
export const messaging = getMessaging(app);
