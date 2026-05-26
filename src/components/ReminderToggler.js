import { Switch } from "@expo/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    cancelNotifications,
    scheduleNotification,
} from "../utils/notifications";

const REMINDER_KEY = "reminderEnabled";

const ReminderToggler = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const loadReminderSetting = async () => {
      const value = await AsyncStorage.getItem(REMINDER_KEY);
      setIsEnabled(value === "true");
    };
    loadReminderSetting();
  }, []);

  const toggleReminder = async () => {
    const newValue = !isEnabled;
    await AsyncStorage.setItem(REMINDER_KEY, String(newValue));
    setIsEnabled(newValue);

    if (newValue) {
      await scheduleNotification();
    } else {
      await cancelNotifications();
    }
  };
  return (
    <View>
      <Text>Reminder</Text>

      <Switch
        value={isEnabled}
        onValueChange={toggleReminder}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReminderToggler;
