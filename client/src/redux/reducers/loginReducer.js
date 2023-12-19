import { REST_PASSWORD_SUCCESS } from "../actions/forgotPassword/forgotPasswordActionType";
import {
  CLEAR_ERROR,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_ACCESS_TOKEN,
} from "../actions/login/loginActionTypes";
import {
  MASTER_DATA_FAIL,
  MASTER_DATA_REQUEST,
  MASTER_DATA_SUCCESS,
} from "../actions/masterData/masterDataActionType";

// Initial state
const initialState = {
  data: [],
  masterData: [],
};

// Reducer function
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case REST_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case LOGIN_FAIL:
      return {
        ...state,
      };
    case CLEAR_ERROR:
      return {
        ...state,
      };

    case MASTER_DATA_REQUEST:
      return {
        ...state,
      };
    case MASTER_DATA_SUCCESS:
      return {
        ...state,
        masterData: action.payload,
      };
    case MASTER_DATA_FAIL:
      return {
        ...state,
      };
    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
