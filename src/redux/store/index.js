// questo file si occuperà di creare il nostro Redux Store all'avvio dell'applicazione

import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import mainReducer from "../reducers";
import cartReducer from "../reducers/cartReducer";
import bookSelectedReducer from "../reducers/bookSelectedReducer";
import userReducer from "../reducers/userReducer";
import booksReducer from "../reducers/booksReducer";

// i singoli reducers vengono combinati insieme in un unico oggetto di stato grazie alla funzione combineReducers PRIMA di essere forniti al configureStore
// perché configureStore ci richiede un unico oggetto
// le singole porzioni di stato si definiscono "slices"

const rootReducer = combineReducers({
  cart: cartReducer,
  books: booksReducer,
  bookSelected: bookSelectedReducer,
  user: userReducer
});

// questa funzione si occuperà di creare lo Store grazie ad una funzione esportata dal pacchetto @reduxjs/toolkit che ci chiede
// delle opzioni (tra cui i nostri reducer) e restituirà un oggetto di stato che avremo poi all'interno della variabile store.
const store = configureStore({
  // reducer: nomeReducer
  reducer: rootReducer
});

export default store;
