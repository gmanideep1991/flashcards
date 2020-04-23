import { ADD_DECK, RETRIEVE_DECKS, ADD_CARD } from "../actions/deck";

export default function deck(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case RETRIEVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card),
        },
      };
    default:
      return state;
  }
}
