import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
import {
  GET_TIMESHEET_REPORTS_FAIL,
  GET_TIMESHEET_REPORTS_REQUEST,
  GET_TIMESHEET_REPORTS_SUCCESS,
} from "./reportsActionType";

const getTimesheetReportsRequest = () => {
  return {
    type: GET_TIMESHEET_REPORTS_REQUEST,
  };
};

const getTimesheetReportsSuccess = (data) => {
  return {
    type: GET_TIMESHEET_REPORTS_SUCCESS,
    payload: data,
  };
};

const getTimesheetReportsFail = () => {
  return {
    type: GET_TIMESHEET_REPORTS_FAIL,
  };
};

export const getTimesheetReportsAction = (getPayload, payload = []) => {
  return async (dispatch) => {
    dispatch(getTimesheetReportsRequest());
    try {
      const response = await makeRequest(
        "POST",
        "api/reports/timesheetReport",
        {
          result: payload,
        },
        getPayload
      );
      dispatch(getTimesheetReportsSuccess(response));
    } catch (err) {
      dispatch(getTimesheetReportsFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
