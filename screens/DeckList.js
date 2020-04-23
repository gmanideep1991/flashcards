import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { handleRetrieveDecks } from "../actions/deck";
import { connect } from "react-redux";
import deck from "../reducers/decks";
import DeckCard from "../components/DeckCard";
class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleRetrieveDecks());
  }

  render() {
    const { deckCards } = this.props;
    if (deckCards.length <= 0) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Please add atleast one deck.</Text>
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={deckCards}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.startAnimation;
                this.props.navigation.navigate("DeckDetail", {
                  deck: item.title,
                });
              }}
            >
              <DeckCard deck={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    );
  }
}
function mapStateToProps({ decks }) {
  const deckCards = Object.keys(decks).map((key) => {
    const card = decks[key];

    return {
      title: card.title,
      questionsCount: card.questions.length,
    };
  });
  return { deckCards };
}
export default connect(mapStateToProps)(DeckList);
