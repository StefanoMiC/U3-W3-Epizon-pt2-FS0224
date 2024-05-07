import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  lastModified: "2024-04-29",
  content: [] // iniziamo con array vuoto perché andremo a gestire un array dal nostro reducer. avessimo avuto un oggetto saremmo partiti con valore null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        lastModified: new Date().toISOString(),
        content: [...state.content, action.payload]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        lastModified: new Date().toISOString(),
        content: state.content.filter((_, i) => i !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
