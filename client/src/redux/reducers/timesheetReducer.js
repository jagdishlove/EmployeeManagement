import {
  GET_TIME_SHEET_APPROVAL_SUCCESS,
  GET_TIME_SHEET_ENTRY_FAIL,
  GET_TIME_SHEET_ENTRY_REQUEST,
  GET_TIME_SHEET_ENTRY_SUCCESS,
  SAVE_TIME_SHEET_ENTRY_FAIL,
  SAVE_TIME_SHEET_ENTRY_SUCCESS,
  CLEAR_SUCCESS_FLAG,
  UPDATE_TIME_SHEET_ENTRY_FAIL,
  RESET_UPDATE_TIME_SHEET_ENTRY_FAIL,
  APPROVE_TIME_SHEET_SUCCESS,
  APPROVE_TIME_SHEET_REQUEST,
  APPROVE_TIME_SHEET_FAIL,
} from "../actions/timeSheet/timeSheetActionType";

// Initial state
const initialState = {
  timeSheetData: [],
  approveTimesheetLoading: false,
  approvalTimesheetData: null,
  isSuccess: false,
  errorTimesheetEdit: false,
  
};

// Reducer function
const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIME_SHEET_ENTRY_REQUEST:
      return {
        ...state,
      };
    case GET_TIME_SHEET_ENTRY_SUCCESS:
      return {
        ...state,
        timeSheetData: action.payload,
      };
    case GET_TIME_SHEET_ENTRY_FAIL: {
      return {
        ...state,
        timeSheetData: [],
      };
    }
    case GET_TIME_SHEET_APPROVAL_SUCCESS: {
      return {
        ...state,
        approvalTimesheetData: action.payload,
      };
    }

    case SAVE_TIME_SHEET_ENTRY_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
      };
    }
    case SAVE_TIME_SHEET_ENTRY_FAIL: {
      return {
        ...state,
        isSuccess: false,
      };
    }
    case UPDATE_TIME_SHEET_ENTRY_FAIL: {
      return {
        ...state,
        errorTimesheetEdit: true,
      };
    }
    case RESET_UPDATE_TIME_SHEET_ENTRY_FAIL: {
      return {
        ...state,
        errorTimesheetEdit: false,
      };
    }
    case CLEAR_SUCCESS_FLAG: {
      return {
        ...state,
        isSuccess: null,
      };
    }
    case APPROVE_TIME_SHEET_REQUEST: {
      return {
        ...state,
        approveTimesheetLoading: true,
      };
    }
    case APPROVE_TIME_SHEET_SUCCESS: {
      return {
        ...state,
        approveTimesheetLoading: false,
      };
    }
    case APPROVE_TIME_SHEET_FAIL: {
      return {
        ...state,
        approveTimesheetLoading: false,
      };
    }
    default:
      return state;
  }
};

export default timesheetReducer;
