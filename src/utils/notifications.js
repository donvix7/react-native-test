import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

// Set the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Request notifications permissions
const requestPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Notifications",
      "You need to enable notifications to use this feature",
    );
  }
};

// Function to schedule notifications
const scheduleNotification = async (meals) => {
  // Request permissions first
  await requestPermission();

  // Remove existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule daily notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Meal Reminder",
      body: "Time for your next meal!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 17,
      minute: 0,
    },
  });
};

// Function to cancel all notifications
const cancelNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export { cancelNotifications, requestPermission, scheduleNotification };
