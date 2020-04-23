import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import TextButton from "../components/TextButton";
import { connect } from "react-redux";
import { handleAddCard } from "../actions/deck";
class AddCard extends Component {
  state = {
    question: "",
    answer: "",
    error: false,
    errorMsg: "",
  };
  onPress = (e) => {
    e.preventDefault();
    if (this.state.question.trim() !== "" && this.state.answer.trim() !== "") {
      const card = {
        question: this.state.question,
        answer: this.state.answer,
      };
      this.props.dispatch(
        handleAddCard(this.props.id, card, () => {
          this.setState({
            question: "",
            answer: "",
            error: false,
            errorMsg: "",
          });
          this.props.navigation.goBack();
        })
      );
    } else {
      this.setState({
        error: true,
        errorMsg: "one  or both of the fields is empty",
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder="Please enter question"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder="Please enter answer"
        />
        {this.state.error && <Text>{this.state.errorMsg}</Text>}
        <TextButton
          disabled={
            this.state.question.trim() === "" || this.state.answer.trim() === ""
          }
          onPress={this.onPress}
        >
          Add Card
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    alignSelf: "stretch",
    borderColor: "gray",
    margin: 30,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#841584",
  },
});

function mapStateToProps({}, { route }) {
  const { id } = route.params;
  return {
    id,
  };
}

export default connect(mapStateToProps)(AddCard);
