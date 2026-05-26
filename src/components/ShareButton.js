import * as Haptics from "expo-haptics";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ShareButton = ({ meals }) => {
  const handleShare = async () => {
    const totals = meals.reduce(
      (acc, meal) => {
        ((acc.carbs += Number(meal.carbs)),
          (acc.protein += Number(meal.protein)),
          (acc.fats += Number(meal.fats)),
          (acc.calories += Number(meal.calories)));
        return acc;
      },
      { carbs: 0, protein: 0, fats: 0, calories: 0 },
    );

    try {
      const mealsString = meals
        .map(
          (meal) =>
            `${meal.name}: ${meal.carbs}g carbs, ${meal.protein}g protein, ${meal.fats}g fats, ${meal.calories} calories`,
        )
        .join("\n");
      await Share.share({
        message: `Here are my meals:\n${mealsString}`,
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: "#f26202",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shareText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "outfit-medium",
  },
});

export default ShareButton;
