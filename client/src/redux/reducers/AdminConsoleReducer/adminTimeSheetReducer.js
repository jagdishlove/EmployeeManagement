import {
  SEARCH_USERNAME_REQUEST,
  SEARCH_USERNAME_FAILURE,
  SEARCH_USERNAME_SUCCESS,
  GET_ALL_TIMESTEET_APPROVERS_FAILURE,
  GET_ALL_TIMESTEET_APPROVERS_REQUEST,
  GET_ALL_TIMESTEET_APPROVERS_SUCCESS,
  GET_ALL_TIMESHEET_FOR_ADMIN_FAILURE,
  GET_ALL_TIMESHEET_FOR_ADMIN_REQUEST,
  GET_ALL_TIMESHEET_FOR_ADMIN_SUCCESS,
} from "../../actions/AdminConsoleAction/timeSheet/adminTimesheetActionType";

const initialState = {
  searchUserData: [],
  approversData: [],
  allTimeSheetsForAdmin: [],
};

const adminTimeSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERNAME_REQUEST:
      return {
        ...state,
      };
    case SEARCH_USERNAME_SUCCESS:
      return {
        ...state,
        searchUserData: action.payload,
      };
    case SEARCH_USERNAME_FAILURE:
      return {
        ...state,
      };
    case GET_ALL_TIMESTEET_APPROVERS_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_TIMESTEET_APPROVERS_SUCCESS:
      return {
        ...state,
        approversData: action.payload,
      };
    case GET_ALL_TIMESTEET_APPROVERS_FAILURE:
      return {
        ...state,
      };
    case GET_ALL_TIMESHEET_FOR_ADMIN_REQUEST:
      return {
        ...state,
      };
    case GET_ALL_TIMESHEET_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        allTimeSheetsForAdmin: action.payload,
      };
    case GET_ALL_TIMESHEET_FOR_ADMIN_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminTimeSheetReducer;
