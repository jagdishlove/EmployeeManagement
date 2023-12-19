import {
  FETCH_LEAVE_HISTORY_FAILURE,
  FETCH_LEAVE_HISTORY_REQUEST,
  FETCH_LEAVE_HISTORY_SUCCESS,
} from "../actions/leaves/leaveHistoryActionType";
import {
  HOLIDAY_LIST_FAIL,
  HOLIDAY_LIST_REQUEST,
  HOLIDAY_LIST_SUCCESS,
  LEAVE_BALANCE_FAIL,
  LEAVE_BALANCE_REQUEST,
  LEAVE_BALANCE_SUCCESS,
  SAVE_LEAVE_FORM_FAIL,
  SAVE_LEAVE_FORM_REQUEST,
  SAVE_LEAVE_FORM_SUCCESS,
  SEARCH_EMAIL_FAIL,
  SEARCH_EMAIL_REQUEST,
  SEARCH_EMAIL_SUCCESS,
} from "../actions/leaves/leavesActionType";

// Initial state
const initialState = {
  leaveBalanceData: [],
  holidayListData: [],
  searchEmailData: [],
  balanceloading: false,
  numberOfDays: 0,
  holidayLaoding: false,
  data: [],
  loading: false,
  error: null,
  leaveFormError: null,
  searchEmailLaoding: false,
  savedLeaveData: {},
  formDataLoading: false,
};

// Reducer function
const LeavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_BALANCE_REQUEST:
      return {
        ...state,
        balanceloading: true,
      };
    case LEAVE_BALANCE_SUCCESS:
      return {
        ...state,
        leaveBalanceData: action.payload,
        balanceloading: false,
      };
    case LEAVE_BALANCE_FAIL: {
      return {
        ...state,
        leaveBalanceData: [],
        balanceloading: false,
      };
    }

    case HOLIDAY_LIST_REQUEST:
      return {
        ...state,
        holidayLaoding: true,
      };
    case HOLIDAY_LIST_SUCCESS:
      return {
        ...state,
        holidayListData: action.payload,
        holidayLaoding: false,
      };
    case HOLIDAY_LIST_FAIL: {
      return {
        ...state,
        holidayListData: [],
        holidayLaoding: false,
      };
    }
    case FETCH_LEAVE_HISTORY_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case FETCH_LEAVE_HISTORY_SUCCESS: {
      return { ...state, loading: false, data: action.payload, error: null };
    }

    case FETCH_LEAVE_HISTORY_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }

    case SEARCH_EMAIL_REQUEST:
      return {
        ...state,
        searchEmailLaoding: true,
      };
    case SEARCH_EMAIL_SUCCESS:
      return {
        ...state,
        searchEmailData: action.payload,
        searchEmailLaoding: false,
      };
    case SEARCH_EMAIL_FAIL: {
      return {
        ...state,
        searchEmailData: [],
        searchEmailLaoding: false,
      };
    }
    case "NUMBERS_OF_DAYS": {
      return {
        ...state,
        numberOfDays: action.payload,
      };
    }
    case SAVE_LEAVE_FORM_REQUEST: {
      return {
        ...state,
        formDataLoading: true,
      };
    }
    case SAVE_LEAVE_FORM_SUCCESS: {
      return {
        ...state,
        savedLeaveData: action.payload,
        leaveFormError: null,
        formDataLoading: false,
      };
    }
    case SAVE_LEAVE_FORM_FAIL: {
      return {
        ...state,
        leaveFormError: true,
        formDataLoading: false,
      };
    }

    default:
      return state;
  }
};

export default LeavesReducer;
