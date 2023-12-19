import { ERRORS, RESET_ERROR } from "../actions/errors/errorsActionTypes";

// Initial state
const initialState = {
  error: null,
};

// Reducer function
const errorMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default errorMessageReducer;
