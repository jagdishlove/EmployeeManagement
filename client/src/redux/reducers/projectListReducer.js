import {
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
} from "../actions/approvals/projectListsActionType";

// Initial state
const initialState = {
  projectLists: [],
};

// Reducer function
const projectListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return {
        ...state,
      };
    case PROJECT_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case PROJECT_LIST_FAIL:
      return {
        ...state,
        data: [],
      };

    default:
      return state;
  }
};

export default projectListReducer;
