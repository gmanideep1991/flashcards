import React, { Component } from "react";

import { Text, View, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";
const bounceValue = new Animated.Value(1);
class DeckDetail extends Component {
  startQuiz = (questionsCount) => {
    if (questionsCount <= 0) {
    }
  };
  componentDidMount() {
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start();
  }
  render() {
    const { title, questionsCount } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.textContainer,
            { transform: [{ scale: bounceValue }] },
          ]}
        >
          <Text style={{ fontSize: 30 }}>{title}</Text>
          <Text style={{ fontSize: 15 }}>{questionsCount} cards</Text>
        </Animated.View>
        <TextButton
          onPress={() =>
            this.props.navigation.navigate("AddCard", { id: title })
          }
        >
          Add Card
        </TextButton>
        <TextButton
          disabled={questionsCount <= 0 ? true : false}
          onPress={() =>
            this.props.navigation.navigate("StartQuiz", { id: title })
          }
        >
          Start Quiz
        </TextButton>
      </View>
    );
  }
}
function mapStateToProps({ decks }, { route }) {
  const { deck } = route.params;
  return {
    title: decks[deck].title,
    questionsCount: decks[deck].questions.length,
  };
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  textContainer: {
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 30,
    backgroundColor: "white",
  },
});

export default connect(mapStateToProps)(DeckDetail);
