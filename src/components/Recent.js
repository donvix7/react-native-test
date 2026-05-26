import { StyleSheet, Text, View } from "react-native";
import NotificationsItems from "./NotificationsItems";

const Recent = ({ meals, onDelete }) => {
  const recent = meals.slice(0, 5);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recent Meals</Text>
      {recent.map((meal, key) => (
        <NotificationsItems
          key={key}
          title={meal.name}
          message={meal.carbs + "g carbs"}
          id={meal.id}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f26202",
    marginTop: 4,
    fontFamily: "outfit-medium",
  },
});

export default Recent;
