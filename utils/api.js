import { AsyncStorage } from "react-native";
const DECKS_STORAGE_KEY = "Flashcards:decks";

const EMPTY_DECK = {};

export async function saveDeckTitleAS(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(EMPTY_DECK));
    }
    return storeResults === null ? EMPTY_DECK : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

export function addCardToDeckAs(title, card) {
  return getDecks().then((decks) => {
    decks[title].questions.push(card);
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
}
