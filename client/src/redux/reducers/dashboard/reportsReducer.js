import {
  GET_DOWNLOAD_REPORTS_FAIL,
  GET_DOWNLOAD_REPORTS_REQUEST,
  GET_DOWNLOAD_REPORTS_SUCCESS,
  GET_SINGLE_DOWNLOAD_REPORT_FAIL,
  GET_SINGLE_DOWNLOAD_REPORT_REQUEST,
    GET_SINGLE_DOWNLOAD_REPORT_SUCCESS,
    GET_TIMESHEET_REPORTS_FAIL,
    GET_TIMESHEET_REPORTS_REQUEST,
    GET_TIMESHEET_REPORTS_SUCCESS,
  } from "../../actions/dashboard/reports/reportsActionType";


  const initialData = {
    timesheetreportsDetails: [],
    timesheetreportsLoading: false,
    singleDownloadDetails: [],
    singleDownloadLoading: false,
    downloadReportsDetails: [],
    downloadReportsLoading: false,
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
        case  GET_SINGLE_DOWNLOAD_REPORT_REQUEST:
          return {
            ...state,
           singleDownloadLoading: true,
          };
        case  GET_SINGLE_DOWNLOAD_REPORT_SUCCESS:
          console.log('GET_SINGLE_DOWNLOAD_REPORT_SUCCESS action payload:', action.payload);
          return {
            ...state,
            singleDownloadDetails: action.payload,
            singleDownloadLoading: false,
          };
        case  GET_SINGLE_DOWNLOAD_REPORT_FAIL:
          return {
            ...state,
            singleDownloadDetails: [],
            singleDownloadLoading: false,
          };

          case GET_DOWNLOAD_REPORTS_REQUEST:
            return {
              ...state,
             downloadReportsLoading: true,
            };
          case  GET_DOWNLOAD_REPORTS_SUCCESS:
            return {
              ...state,
              downloadReportsDetails: action.payload,
              downloadReportsLoading: false,
            };
          case  GET_DOWNLOAD_REPORTS_FAIL:
            return {
              ...state,
              downloadReportsDetails: [],
              downloadReportsLoading: false,
            };
      
  
      default:
        return state;
    }
  };
  
  export default timesheetReportsReducer;