import {
  HISTORY_DATA_FAIL,
  HISTORY_DATA_REQUEST,
  HISTORY_DATA_SUCCESS,
} from "../actions/historyData/historyDataActionType";

const initialData = {
  historyData: [],
};

const historyDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case HISTORY_DATA_REQUEST:
      return {
        ...state,
        historyData: [],
      };
    case HISTORY_DATA_SUCCESS:
      return {
        ...state,
        historyData: action.payload,
      };
    case HISTORY_DATA_FAIL: {
      return {
        ...state,
        historyData: [],
      };
    }

    default:
      return state;
  }
};

export default historyDataReducer;
