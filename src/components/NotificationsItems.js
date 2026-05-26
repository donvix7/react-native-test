import { StyleSheet, Text, View } from "react-native";

const NotificationsItems = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 10,
    borderWidth: 0.1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f26202",
    marginTop: 4,
    fontFamily: "outfit-medium",
  },
  message: {
    fontSize: 12,
    color: "#f26202",
    marginTop: 4,
    fontFamily: "outfit-medium",
  },
});

export default NotificationsItems;
