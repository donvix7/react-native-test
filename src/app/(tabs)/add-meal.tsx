import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addMeals } from "../../storage/meals";

const AddMealScreen = () => {
  const [name, setName] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddMeal = async () => {
    const meal = {
      name,
      carbs,
      protein,
      fats,
      calories,
    };

    const result = await addMeals(meal);
    if (result) {
      Alert.alert("Meal added successfully!");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Alert.alert("Failed to add meal");
    }

    console.log(meal);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Add Meal</Text>
        <TextInput
          style={styles.input}
          placeholder="Meal Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Carbs (g)"
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={styles.input}
          placeholder="Protein (g)"
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={styles.input}
          placeholder="Fats (g)"
          keyboardType="numeric"
          value={fats}
          onChangeText={setFats}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f26202",
    margin: 4,

    fontFamily: "outfit-medium",
  },
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontFamily: "outfit-medium",
  },
  button: {
    backgroundColor: "#f26202",
    padding: 15, // slightly larger padding for premium feel
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
    fontFamily: "outfit-medium",
    textAlign: "center",
  },
});

export default AddMealScreen;
