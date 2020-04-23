import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddDeck from "../screens/AddDeck";
import DeckList from "../screens/DeckList";
const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 20 },
        keyboardHidesTabBar: false,
      }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckList}
        options={{
          title: "Decks",
        }}
      />
      <Tab.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          title: "Add Deck",
        }}
      />
    </Tab.Navigator>
  );
}
function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? "Decks";

  switch (routeName) {
    case "Decks":
      return "Decks";
    case "AddDeck":
      return "AddDeck";
  }
}
