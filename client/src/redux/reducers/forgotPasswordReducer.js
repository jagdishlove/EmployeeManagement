import {
  FORGOT_PASS_EMAIL_FAIL,
  FORGOT_PASS_EMAIL_REQUEST,
  FORGOT_PASS_EMAIL_SUCCESS,
  REST_PASSWORD_FAIL,
  REST_PASSWORD_REQUEST,
} from "../actions/forgotPassword/forgotPasswordActionType";

// Initial state
const initialState = {
  loading: false,
};

// Reducer function
const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASS_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASS_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FORGOT_PASS_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REST_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REST_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default forgotPasswordReducer;
