import { saveDeckTitleAS, getDecks, addCardToDeckAs } from "../utils/api";
export const ADD_DECK = "ADD_DECK";
export const RETRIEVE_DECKS = "RETRIEVE_DECKS";
export const ADD_CARD = "ADD_CARD";
function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

function retrieveDecks(decks) {
  return {
    type: RETRIEVE_DECKS,
    decks,
  };
}

function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}

export function handleAddDeck(title, callback) {
  return (dispatch) => {
    return saveDeckTitleAS(title).then(() => {
      dispatch(addDeck(title));
      callback(title);
    });
  };
}

export function handleRetrieveDecks() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(retrieveDecks(decks));
    });
  };
}

export function handleAddCard(id, card, callback) {
  return (dispatch) => {
    return addCardToDeckAs(id, card).then(() => {
      dispatch(addCardToDeck(id, card));
      callback();
    });
  };
}
