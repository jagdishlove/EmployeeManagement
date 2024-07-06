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
  ADMIN_CONSOLE_APPROVE_TIMESHEET_REQUEST,
  ADMIN_CONSOLE_APPROVE_TIMESHEET_SUCCESS,
  ADMIN_CONSOLE_APPROVE_TIMESHEET_FAILURE,
} from "../../actions/AdminConsoleAction/timeSheet/adminTimesheetActionType";

const initialState = {
  searchUserData: [],
  approversData: [],
  allTimeSheetsForAdmin: [],
  adminConsoleApproveTimesheetLoading: false,
  allTimeSheetsForAdminLoading: false,
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
        allTimeSheetsForAdminLoading: true,
      };
    case GET_ALL_TIMESHEET_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        allTimeSheetsForAdmin: action.payload,
        allTimeSheetsForAdminLoading: false,
      };
    case GET_ALL_TIMESHEET_FOR_ADMIN_FAILURE:
      return {
        ...state,
        allTimeSheetsForAdminLoading: false,
      };
    case "GET_ALL_TIMESHEET_FOR_ADMIN_RESET":
      return {
        ...state,
        allTimeSheetsForAdmin: [],
      };

    case ADMIN_CONSOLE_APPROVE_TIMESHEET_REQUEST:
      return {
        ...state,
        adminConsoleApproveTimesheetLoading: true,
      };
    case ADMIN_CONSOLE_APPROVE_TIMESHEET_SUCCESS:
      return {
        ...state,
        adminConsoleApproveTimesheetLoading: false,
      };
    case ADMIN_CONSOLE_APPROVE_TIMESHEET_FAILURE:
      return {
        ...state,
        adminConsoleApproveTimesheetLoading: false,
      };
    default:
      return state;
  }
};

export default adminTimeSheetReducer;
