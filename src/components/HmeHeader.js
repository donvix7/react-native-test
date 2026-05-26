import { StyleSheet, Text, View } from "react-native";
import ReminderToggler from "./ReminderToggler";

const HmeHeader = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Good Morning</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <ReminderToggler />
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    color: "#f26202",
    marginTop: 4,
  },
  header: {
    fontSize: 20,
    color: "#f26202",
    marginTop: 4,
    fontFamily: "outfit-medium",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HmeHeader;
