// reducer.js
import {
  FETCH_LEAVE_HISTORY_FAILURE,
  FETCH_LEAVE_HISTORY_REQUEST,
  FETCH_LEAVE_HISTORY_SUCCESS,
} from "../actions/leaves/leaveHistoryActionType";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const leaveHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEAVE_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_LEAVE_HISTORY_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case FETCH_LEAVE_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default leaveHistoryReducer;
