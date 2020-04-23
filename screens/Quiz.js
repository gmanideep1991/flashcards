import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";
class Quiz extends Component {
  state = {
    current: 0,
    correct: 0,
    showAnswer: false,
  };
  viewAnswer = () => {
    this.setState((prevState) => ({
      showAnswer: !prevState.showAnswer,
    }));
  };

  onCorrect = () => {
    this.setState((prevState) => ({
      current: prevState.current + 1,
      correct: prevState.correct + 1,
      showAnswer: false,
    }));
  };
  onInCorrect = () => {
    this.setState((prevState) => ({
      current: prevState.current + 1,
      showAnswer: false,
    }));
  };
  restart = () => {
    this.setState({
      current: 0,
      correct: 0,
      showAnswer: false,
    });
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  render() {
    const { questions } = this.props;
    const { current, correct, showAnswer } = this.state;
    const totalQuestions = Object.keys(questions).length;

    if (current >= totalQuestions) {
      return (
        <View style={styles.container}>
          <Text>
            You got {correct} out of {totalQuestions} correct. (
            {((correct / totalQuestions) * 100).toFixed(2)}%)
          </Text>
          <TextButton onPress={this.restart}>Restart Quiz</TextButton>
          <TextButton onPress={this.goBack}>Go to deck</TextButton>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.remainingContainer}>
          <Text style={styles.remaining}>
            {current + 1} / {totalQuestions}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 30 }}>
            {showAnswer
              ? questions[current].answer
              : questions[current].question}
          </Text>
        </View>
        {!showAnswer && (
          <TextButton onPress={this.viewAnswer}>View answer</TextButton>
        )}
        {showAnswer && (
          <View styles={styles.buttonsContainer}>
            <TextButton onPress={this.onCorrect}>Correct</TextButton>
            <TextButton onPress={this.onInCorrect}>Incorrect</TextButton>
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps({ decks }, { route }) {
  return {
    questions: { ...decks[route.params.id].questions },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  remaining: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  remainingContainer: {
    alignSelf: "stretch",
  },
});
export default connect(mapStateToProps)(Quiz);
