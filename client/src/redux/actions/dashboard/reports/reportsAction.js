import { toast } from "react-toastify";
import makeRequest, { downloadApi } from "../../../../api/api";
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
import { saveAs } from "file-saver";

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

export const getSingleDownloadReportAction = (link, month, year) => {
  return async (dispatch) => {
    try {
      dispatch(singleDownloadReportRequest());
      const newUrl = `${link}?month=${month}&year=${year}`;

      // Fetch the file data from the API
      const response = await downloadApi("GET", newUrl, {
        responseType: "blob",
      });

      saveAs(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `Timesheet_Report_${month}_${year}.xlsx`
      );

      dispatch(singleDownloadReportSuccess(response.data));
    } catch (err) {
      dispatch(singleDownloadReportFail());

      // Show an error toast notification
      toast.error(
        err?.response?.data?.errorMessage || "Error downloading file",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
  };
};

export const getDownloadReportsAction = (data) => {
  const { year, month, employmentTypeId, projectId } = data;
  const newEmploymentTypeId =
    employmentTypeId !== "All" ? employmentTypeId : "";
  const newProjectId = projectId !== "All" ? projectId : "";
  return async (dispatch) => {
    try {
      dispatch(downloadReportsRequest());
      const link = "api/reports/download/timesheet-reports";
      const newUrl = `${link}?year=${year}&month=${month}&employementTypeId=${newEmploymentTypeId}&projectId=${newProjectId}`;

      // Fetch the file data from the API
      const response = await downloadApi("GET", newUrl, {
        responseType: "blob",
      });
      saveAs(
        new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `Timesheet_Report_${month}_${year}.xlsx`
      );

      dispatch(singleDownloadReportSuccess(response));
      dispatch(downloadReportsSuccess(response));
    } catch (err) {
      dispatch(downloadReportsFail());
      toast.error(err?.response?.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
