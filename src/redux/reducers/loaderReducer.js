import { LOADER_START, LOADER_STOP } from "../actions/loader/loaderActionType";

// Initial state
const initialState = {
  globalLoading: false,
  activeRequests: 0,
};

// Reducer function
const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_START:
      return {
        ...state,
        globalLoading: true,
        activeRequests: state.activeRequests + 1,
      };
    case LOADER_STOP:
      return {
        ...state,
        activeRequests: Math.max(state.activeRequests - 1, 0),
        globalLoading: state.activeRequests - 1 > 0,
      };
    default:
      return state;
  }
};

export default loaderReducer;
