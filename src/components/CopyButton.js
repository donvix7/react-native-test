import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CopyButton = ({ meals }) => {
  const handleCopy = async () => {
    const mealData = meals
      .map(
        (meal) =>
          `${meal.name}: ${meal.carbs}g carbs, ${meal.protein}g protein, ${meal.fats}g fats, ${meal.calories} calories`,
      )
      .join("\n");
    await Clipboard.setStringAsync(mealData);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copy", "Meal data copied to clipboard");
  };
  return (
    <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
      <Text style={styles.copyText}>Copy</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  copyButton: {
    backgroundColor: "#f26202",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  copyText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "outfit-medium",
  },
});

export default CopyButton;
