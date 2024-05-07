import { GET_BOOKS } from "../actions";

const initialState = {
  content: []
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        content: action.payload
      };

    default:
      return state;
  }
};

export default booksReducer;
