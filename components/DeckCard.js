import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class DeckCard extends Component {
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text>{deck.questionsCount} cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default DeckCard;
