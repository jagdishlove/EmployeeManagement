import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
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

const singleDownloadReportRequest = () => {
  return {
    type: GET_SINGLE_DOWNLOAD_REPORT_REQUEST,
  };
};

const singleDownloadReportSuccess = (data) => {
  return {
    type: GET_SINGLE_DOWNLOAD_REPORT_SUCCESS,
    payload: data,
  };
};

const singleDownloadReportFail = () => {
  return {
    type: GET_SINGLE_DOWNLOAD_REPORT_FAIL,
  };
};

const downloadReportsRequest = () => {
  return {
    type: GET_DOWNLOAD_REPORTS_REQUEST,
  };
};

const downloadReportsSuccess = (data) => {
  return {
    type: GET_DOWNLOAD_REPORTS_SUCCESS,
    payload: data,
  };
};

const downloadReportsFail = () => {
  return {
    type: GET_DOWNLOAD_REPORTS_FAIL,
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

export const getSingleDownloadReportAction = (params, employeeId) => {
  return async (dispatch) => {
    dispatch(singleDownloadReportRequest());
    try {
      const response = await makeRequest(
        "GET",
        `api/reports/download/timesheetReport/${employeeId}`,
        null,
        params
      );
      console.log('Response:', response);
      dispatch(singleDownloadReportSuccess(response));
    } catch (err) {
      dispatch(singleDownloadReportFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getDownloadReportsAction = ( params) => {
  return async (dispatch) => {
    dispatch(downloadReportsRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/reports/download/timesheet-reports",
        null,
        params
      );
      dispatch(downloadReportsSuccess(response));
    } catch (err) {
      dispatch(downloadReportsFail());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
