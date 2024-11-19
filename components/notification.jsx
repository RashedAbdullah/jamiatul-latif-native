import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Push Notifications সেটআপ করার ফাংশন
export async function registerForPushNotificationsAsync() {
  let token = null;

  try {
    // নোটিফিকেশনের জন্য অনুমতি চাওয়া
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Push notification permission not granted!");
      return null;
    }

    // টোকেন জেনারেট করা
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error("EAS Project ID not found in app configuration.");
    }

    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

    

    // টোকেন ব্যাকএন্ডে পাঠানো
    const response = await fetch(
      "https://www.jamiatullatif.com/api/expo-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to send token to the server:", error);
    } else {
      console.log("Token sent to server successfully.");
    }
  } catch (error) {
    console.error("Error in push notification setup:", error);
    alert("An error occurred during push notification setup.");
  }

  return token;
}
