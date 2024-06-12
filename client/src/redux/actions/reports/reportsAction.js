import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import {
    REPORTS_REQUEST,
    REPORTS_SUCCESS,
    REPORTS_FAILURE
} from "../../actions/reports/reportsActionType";


const getReportsRequest = () => {
    return {
      type: REPORTS_REQUEST,
    };
  };
  
  const getReportsSuccess = (data) => {
    return {
      type: REPORTS_SUCCESS,
      payload: data,
    };
  };
  
  const getReportsFailure = () => {
    return {
      type: REPORTS_FAILURE,
    };
  };

  export const getAllReports = (params) => {
    return async (dispatch) => {
      dispatch(getReportsRequest());
      try {
        const response = await makeRequest(
          "POST",
          "/api/reports/timesheetReport",
          null,
          params
        );
        dispatch(getReportsSuccess(response));
      } catch (err) {
        dispatch(getReportsFailure());
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
  };