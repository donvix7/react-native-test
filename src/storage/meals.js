import AsyncStorage from "@react-native-async-storage/async-storage";

const MEALS_KEY = "meals";

const getMeals = async () => {
  try {
    const meals = await AsyncStorage.getItem(MEALS_KEY);
    return meals ? JSON.parse(meals) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
const addMeals = async (meal) => {
  const meals = await getMeals();

  const newMeals = {
    id: Date.now().toString(),
    ...meal,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([...meals, newMeals]));
    return newMeals;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const deleteMeal = async (id) => {
  const meals = await getMeals();
  const newMeals = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(newMeals));
  return newMeals;
};

const clearAll = async () => {
  await AsyncStorage.removeItem(MEALS_KEY);
};
export { addMeals, clearAll, deleteMeal, getMeals };

