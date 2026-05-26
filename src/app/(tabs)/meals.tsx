import * as Haptics from "expo-haptics";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { clearAll, deleteMeal, getMeals } from "../../storage/meals";

interface Meal {
  id: string;
  name: string;
  carbs: number;
  protein: number;
  fats: number;
  calories: number;
  createdAt: string;
  delete: () => void;
}

const MealsScreen = () => {
  const [mealsList, setMealsList] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteMeal = async (id: string) => {
    await deleteMeal(id);
    setMealsList((prev) => prev.filter((meal) => meal.id !== id));
  };

  const handleClearAll = async () => {
    await clearAll();
    setMealsList([]);
  };

  const handleLongPress = (id: string) => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          (handleDeleteMeal(id),
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success,
            ));
        },
      },
    ]);
  };
  const fetchMeals = useCallback(async () => {
    setLoading(true);
    const storedMeals = await getMeals();
    // Sort by createdAt descending
    const sorted = [...storedMeals].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setMealsList(sorted);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMeals();
    }, [fetchMeals]),
  );

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>Logged Meals</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f26202" style={styles.loader} />
      ) : mealsList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No meals logged yet today.</Text>
          <Link href="/add-meal" asChild>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Log Your First Meal</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        mealsList.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.mealCard}
            onLongPress={() => handleLongPress(meal.id)}
            delayLongPress={500}
            activeOpacity={0.8}
          >
            <View style={styles.mealHeader}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealTime}>{formatTime(meal.createdAt)}</Text>
            </View>
            <View style={styles.macroRow}>
              <View style={styles.macroCol}>
                <Text style={styles.macroVal}>{meal.carbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroVal}>{meal.protein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroVal}>{meal.fats}g</Text>
                <Text style={styles.macroLabel}>Fats</Text>
              </View>
              <View style={styles.macroCol}>
                <Text style={[styles.macroVal, styles.caloriesVal]}>
                  {meal.calories}
                </Text>
                <Text style={styles.macroLabel}>Calories</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "outfit-medium",
  },
  addButton: {
    backgroundColor: "#f26202",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "outfit-medium",
  },
  loader: {
    marginTop: 40,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#828282",
    marginBottom: 20,
    fontFamily: "outfit-medium",
  },
  emptyButton: {
    borderWidth: 1,
    borderColor: "#f26202",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#f26202",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "outfit-medium",
  },
  mealCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 10,
    marginBottom: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "outfit-medium",
  },
  mealTime: {
    fontSize: 12,
    color: "#828282",
    fontFamily: "outfit-medium",
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroCol: {
    alignItems: "center",
    flex: 1,
  },
  macroVal: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  caloriesVal: {
    color: "#f26202",
    fontWeight: "bold",
  },
  macroLabel: {
    fontSize: 11,
    color: "#828282",
    marginTop: 4,
    fontFamily: "outfit-medium",
  },
  clearButtonText: {
    color: "#f26202",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "outfit-medium",
  },
});

export default MealsScreen;
