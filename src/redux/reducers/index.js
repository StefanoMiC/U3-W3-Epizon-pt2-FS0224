// qui dentro definiremo la nostra funzione PURA che sarà il reducer principale del nostro Store
// il reducer prende lo STATO CORRENTE dell'applicazione nel momento in cui viene "risvegliato" (dopo una dispatch)
// e prenderà anche l'ACTION che gli inviamo attraverso la dispatch() dal nostro componente o UI

import { ADD_TO_CART, REMOVE_FROM_CART, SELECT_BOOK, SET_USER } from "../actions";

// a questo punto con STATO CORRENTE e ACTION genererà il NUOVO STATO GENERALE, il nuovo stato del nostro STORE.

// ogni volta che verrà risvegliato avrà bisogno di leggere dalla nostra action il TYPE ed eventuale PAYLOAD
// da dove cominciare quindi? da uno stato iniziale per la nostra applicazione!

// lo stato iniziale dovrebbe riflettere con dei valori di default quelli finali

const initialState = {
  cart: {
    lastModified: "2024-04-29",
    content: [] // iniziamo con array vuoto perché andremo a gestire un array dal nostro reducer. avessimo avuto un oggetto saremmo partiti con valore null
  },
  bookSelected: {
    content: null
  },
  user: {
    content: ""
  }
};

// questo stato iniziale è quello che viene generato automaticamente ad ogni refresh del browser, e rappresenta la condizione iniziale del nostro redux store.
// potremo modificarlo solamente in maniera IMMUTABILE - creando sempre un nuovo oggetto nella sua interezza, partendo dai dati presenti nello stato in precedenza,
// più quelli nuovi derivanti dalla nostra ACTION.

// il reducer è una funzione PURA e quindi non modifica/manipola MAI i suoi parametri direttamente (state, action), li leggerà solamente!
// e in base alle operazioni matematiche prevedibili, computerà il nuovo stato di ritorno dalla funzione stessa.
// questo stato ritornato è DI FATTO il nuovo STORE aggiornato!

// per il primo avvio e per il primo soltanto ci dobbiamo preoccupare di attribuire un valore di default al parametro state che sarà, inizialmente, undefined
// ad ogni successivo avvio del reducer state sarà l'effettivo STATO CORRENTE.
const mainReducer = (state = initialState, action) => {
  // da questa funzione, IN OGNI CASO o SITUAZIONE, si dovrà PER FORZA ritornare IL NUOVO STATO o quanto meno quello PRECEDENTE.
  // bisogna evitare a tutti i costi di non avere un return di uno stato, avendo il default case che ritorna lo stato precedente
  // ci proteggiamo dall'eventualità che il nuovo valore di stato ritornato sia undefined, il che romperebbe il flusso di redux!

  switch (action.type) {
    // case "INCREMENT":
    // // qui dentro si computerà il nuovo stato globale
    // return {}

    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          // sintassi valida:
          // content: state.cart.content.concat(action.payload)

          // sintassi da abolire(metodi che mutano gli array di partenza):
          // content: state.cart.content.push(action.payload) // NO!!!!
          // il push muta l'array di partenza e oltrettuto ci ritorna il numero della nuova length, di cui non ce ne facciamo niente
          lastModified: new Date().toISOString(),
          content: [...state.cart.content, action.payload]
        }
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,

          // prende tutti gli elementi prima di quello cliccato con il primo slice,
          // poi col secondo saltiamo l'elemento stesso e prendiamo tutti i sucessivi
          // due metodi validi per rimuovere un indice in modo non mutevole:

          // content: state.cart.content.slice(0, action.payload).concat(state.cart.content.slice(action.payload + 1))
          // content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)]
          lastModified: new Date().toISOString(),
          content: state.cart.content.filter((_, i) => i !== action.payload)

          // da NON FARE assolutamente questo:
          // sbagliatissimo fare uno splice perché muteremmo l'array originario e ritorneremmo solo un elemento, quello rimosso (quindi object)
          // content: state.cart.content.splice(action.payload, 1)
        }
      };

    case SELECT_BOOK:
      return {
        ...state,
        bookSelected: {
          ...state.bookSelected,
          content: action.payload
        }
      };

    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          content: action.payload
        }
      };

    default:
      return state;
  }
};

export default mainReducer;
