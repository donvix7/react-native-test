import { StyleSheet, Text, View } from "react-native";

const DisplayCards = ({ title, amount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "#e0e0e0",
    width: "47%", // Allows 2-column wrapping in a row container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#828282",
    fontFamily: "outfit-medium",
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f26202",
    marginTop: 8,
  },
});

export default DisplayCards;
