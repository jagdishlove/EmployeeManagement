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
  STORE_TIMESHEET_DATA,
} from "../../actions/AdminConsoleAction/timeSheet/adminTimesheetActionType";

const initialState = {
  searchUserData: [],
  approversData: [],
  allTimeSheetsForAdmin: [],
  adminConsoleApproveTimesheetLoading: false,
  timesheetDataStored: [],
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
    case STORE_TIMESHEET_DATA:
      console.log("STORE_TIMESHEET_DATA", action.payload);
      console.log("Current timesheetDataStored", state.timesheetDataStored);

      // Check if timesheetEntryIds exist in the payload and it's an array
      if (
        Array.isArray(action.payload.timesheetEntryId) &&
        action.payload.timesheetEntryId.length > 0
      ) {
        // Filter out records with timesheetEntryIds that exist in action.payload.timesheetEntryIds
        const updatedTimesheetDataStored = state.timesheetDataStored.filter(
          (entry) =>
            !action.payload.timesheetEntryId.includes(entry.timesheetEntryId)
        );

        return {
          ...state,
          timesheetDataStored: updatedTimesheetDataStored,
        };
      }

      if (action.payload.message === "null") {
        return {
          ...state,
          timesheetDataStored: [],
        };
      } else {
        return {
          ...state,
          timesheetDataStored: state.timesheetDataStored
            .flat()
            .concat(action.payload),
        };
      }

    default:
      return state;
  }
};

export default adminTimeSheetReducer;
