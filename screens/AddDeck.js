import React, { Component } from "react";
import { NavigationActions, StackActions } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import TextButton from "../components/TextButton";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/deck";

class AddDeck extends Component {
  state = {
    value: "",
    error: false,
    eerrorMsg: "",
  };
  onPress = (e) => {
    e.preventDefault();
    if (this.state.value !== "") {
      this.props.dispatch(
        handleAddDeck(this.state.value, (title) => {
          this.props.navigation.navigate("DeckDetail", {
            deck: title,
          });
          this.setState({
            value: "",
          });
        })
      );
    } else {
      this.setState({
        value: "",
        error: true,
        errorMsg: "value cannot be empty!",
      });
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => this.setState({ value })}
          value={this.state.value}
          placeholder="Please enter deck name"
        />
        {this.state.error && <Text>{this.state.errorMsg}</Text>}
        <TextButton
          disabled={this.state.value.trim() === ""}
          onPress={this.onPress}
        >
          Create
        </TextButton>
      </KeyboardAvoidingView>
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

export default connect()(AddDeck);
