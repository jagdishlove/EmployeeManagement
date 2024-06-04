import {
    GET_TIMESHEET_REPORTS_FAIL,
    GET_TIMESHEET_REPORTS_REQUEST,
    GET_TIMESHEET_REPORTS_SUCCESS,
  } from "../../actions/dashboard/reports/reportsActionType";


  const initialData = {
    timesheetreportsDetails: [],
    timesheetreportsLoading: false,
 
  };
  
  const timesheetReportsReducer = (state = initialData, action) => {
    switch (action.type) {
      case GET_TIMESHEET_REPORTS_REQUEST:
        return {
          ...state,
          timesheetreportsLoading: true,
        };
      case GET_TIMESHEET_REPORTS_SUCCESS:
        return {
          ...state,
          timesheetreportsDetails: action.payload,
          timesheetreportsLoading: false,
        };
      case GET_TIMESHEET_REPORTS_FAIL:
        return {
          ...state,
          timesheetreportsDetails: [],
          timesheetreportsLoading: false,
        };
      
  
      default:
        return state;
    }
  };
  
  export default timesheetReportsReducer;