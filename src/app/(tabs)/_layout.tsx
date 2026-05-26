import { Tabs } from "expo-router";
const Tablayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F26202",
        tabBarInactiveTintColor: "#828282",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen name="meals" options={{ title: "Meals" }} />
      <Tabs.Screen name="add-meal" options={{ title: "Add Meal" }} />
    </Tabs>
  );
};

export default Tablayout;
