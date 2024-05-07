export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SELECT_BOOK = "SELECT_BOOK";
export const SET_USER = "SET_USER";
export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOKS_LOADING_ON = "GET_BOOKS_LOADING_ON";
export const GET_BOOKS_LOADING_OFF = "GET_BOOKS_LOADING_OFF";
export const GET_BOOKS_ERROR_ON = "GET_BOOKS_ERROR_ON";
export const GET_BOOKS_ERROR_OFF = "GET_BOOKS_ERROR_OFF";

// ACTION CREATORS - Funzioni che tornano l'azione (oggetto)

// export const addToCartAction = () => {
//   return { type: ADD_TO_CART, payload: bookSelected };
// };
// export const addToCartAction = bookSelected => ({ type: ADD_TO_CART, payload: bookSelected });

export const addToCartActionWithThunk = bookSelected => {
  return (dispatch, getState) => {
    const currentState = getState();
    const userName = currentState.user.content;

    // findIndex restituisce il valore numerico dell'indice della posizione trovata nell'array su cui è utilizzato
    // quindi ci darà un valore positivo se trova un bookSelected con lo stesso id di un libro nel carrello
    // tornerà -1 invece quando non ha trovato una corrispondenza rispetto al libro che stiamo cercando di inserire in quel momento
    const isBookAlreadyInCart = currentState.cart.content.findIndex(book => book.id === bookSelected.id) !== -1;

    if (!isBookAlreadyInCart) {
      dispatch({ type: ADD_TO_CART, payload: bookSelected });
    } else {
      alert(userName + " guarda che il libro è già nel carrello...");
    }
  };
};
export const removeFromCartAction = i => ({ type: REMOVE_FROM_CART, payload: i });
export const setUserAction = inputValue => ({ type: SET_USER, payload: inputValue });
export const selectBookAction = book => ({ type: SELECT_BOOK, payload: book });

// grazie a redux-thunk, che è un middleware GIA' INTEGRATO nel nostro configureStore di redux toolkit
// possiamo creare degli action creator che ritornino NON SOLO una singola ACTION (oggetto js)
// ma anche funzioni! col vantaggio che queste funzioni interne possono essere dichiarate come async

export const getBooksAction = () => {
  // la funzione RITORNATA dal nostro action creator è quella che possiamo rendere async
  return async (dispatch, getState) => {
    // come primo parametro ci viene regalata la funzione dispatch, SEMPRE necessaria per l'invio di un'action al reducer
    // per essere sincronizzati col momento effettivo in cui siamo pronti ad inviarla, dopo l'arrivo dei dati da una fetch che è asincrona
    console.log("GET STATE", getState());
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();
        // a questo punto avremo aspettato la risoluzione della fetch e ottenuto i dati dei libri
        // e quindi potremmo fare la dispatch di un'azione con fetchedBooks come payload!
        dispatch({ type: GET_BOOKS, payload: fetchedBooks });
        dispatch({ type: GET_BOOKS_ERROR_OFF });
      } else {
        console.log("error");
        throw new Error("Errore nel reperimento dei dati 😥");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_BOOKS_ERROR_ON, payload: error.message });
    } finally {
      dispatch({ type: GET_BOOKS_LOADING_OFF });
    }
  };
};
