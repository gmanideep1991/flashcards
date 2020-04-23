import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import DeckDetail from "../components/DeckDetail";
import { NavigationContainer } from "@react-navigation/native";
import AddCard from "../screens/AddCard";
import Quiz from "../screens/Quiz";

const Stack = createStackNavigator();
export default function Stacknavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={styles.headeroptions}
        />
        <Stack.Screen
          name="DeckDetail"
          component={DeckDetail}
          options={styles.headeroptions}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={styles.headeroptions}
        />
        <Stack.Screen
          name="StartQuiz"
          component={Quiz}
          options={styles.headeroptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  headeroptions: {
    headerStyle: {
      backgroundColor: "#772ea2",
    },
    headerTintColor: "#fff",
  },
};
