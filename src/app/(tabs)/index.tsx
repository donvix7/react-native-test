import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CopyButton from "../../components/CopyButton";
import GridItems from "../../components/GridItems";
import HmeHeader from "../../components/HmeHeader";
import Recent from "../../components/Recent";
import ShareButton from "../../components/ShareButton";
import { getMeals } from "../../storage/meals";
export default function Index() {
  const [meals, setMeals] = useState([]);

  const fetchMeals = useCallback(() => {
    getMeals().then((res) => setMeals(res));
  }, []);

  useFocusEffect(fetchMeals);

  return (
    <ScrollView>
      <View style={styles.container}>
        <HmeHeader />
        <View style={styles.buttonContainer}>
          <ShareButton meals={meals} />
          <CopyButton meals={meals} />
        </View>
      </View>
      <GridItems meals={meals} />
      <Recent meals={meals} onDelete={fetchMeals} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 12,
  },
});
