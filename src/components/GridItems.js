import { StyleSheet, Text, View } from "react-native";
import DisplayCards from "./DisplayCards";

const GridItems = ({ meals }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Overview</Text>
      <View style={styles.grid}>
        <DisplayCards title={"Carbs"} amount={totals.carbs} />
        <DisplayCards title={"Proteins"} amount={totals.protein} />
        <DisplayCards title={"Fats"} amount={totals.fats} />
        <DisplayCards title={"Calories"} amount={totals.calories} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
    columnGap: "6%", // Space between items dynamically calculated based on width
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f26202",
    marginTop: 4,
    fontFamily: "outfit-medium",
  },
});

export default GridItems;
