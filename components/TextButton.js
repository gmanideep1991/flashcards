import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function TextButton({ children, onPress, disabled = false }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, { opacity: disabled ? 0.5 : 1 }]}
      >
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10,
  },
  text: {
    color: "white",
  },
});
