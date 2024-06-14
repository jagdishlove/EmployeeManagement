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

      // Increment the month by 1
      const nextMonth = month + 1;

      const newUrl = `${link}?month=${nextMonth}&year=${year}`;

      // Fetch the file data from the API
      const response = await downloadApi("GET", newUrl, {
        responseType: "blob",
      });

      // Get the content-disposition header from the response
      const contentDisposition = response.headers.get('content-disposition');

      // Extract the filename from the content-disposition header using a regex
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      let filename = null;
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }

      // Use the saveAs function to save the blob with the extracted filename
      saveAs(response.data, filename);

      dispatch(singleDownloadReportSuccess(filename));
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

      // Increment the month by 1
      const nextMonth = month + 1;

      // Array of month names
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      // Ensure the month number is within the range 0-11
      const nextMonthIndex = (nextMonth - 1) % 12;
      const nextMonthName = monthNames[nextMonthIndex];

      const link = "api/reports/download/timesheet-reports";
      const newUrl = `${link}?year=${year}&month=${nextMonth}&employmentTypeId=${newEmploymentTypeId}&projectId=${newProjectId}`;

      // Fetch the file data from the API
      const response = await downloadApi("GET", newUrl, {
        responseType: "blob",
      });

      // Get the content-disposition header from the response
      const contentDisposition = response.headers.get('content-disposition');

      // Extract the filename from the content-disposition header using a regex
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      let filename = `Timesheet_Reports_${nextMonthName}_${year}.xlsx`; // Default filename

      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }

      // Use the saveAs function to save the blob with the extracted filename
      saveAs(response.data, filename);

      // Dispatch success action
      dispatch(downloadReportsSuccess(response));
    } catch (err) {
      dispatch(downloadReportsFail());

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

