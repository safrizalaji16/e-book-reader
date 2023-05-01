import { FETCH_BOOKS } from "../actions/actionType";

const stateData = {
  books: [],
};

export default function booksReducer(state = stateData, action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        books: action.data,
      };

    default:
      return state;
  }
}
