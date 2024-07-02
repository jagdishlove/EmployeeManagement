import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  APPROVE_TIME_SHEET_FAIL,
  APPROVE_TIME_SHEET_REQUEST,
  APPROVE_TIME_SHEET_SUCCESS,
  GET_TIME_SHEET_APPROVAL_FAIL,
  GET_TIME_SHEET_APPROVAL_REQUEST,
  GET_TIME_SHEET_APPROVAL_SUCCESS,
  GET_TIME_SHEET_ENTRY_FAIL,
  GET_TIME_SHEET_ENTRY_REQUEST,
  GET_TIME_SHEET_ENTRY_SUCCESS,
  REJECT_TIME_SHEET_FAIL,
  REJECT_TIME_SHEET_REQUEST,
  REJECT_TIME_SHEET_SUCCESS,
  SAVE_TIME_SHEET_ENTRY_FAIL,
  SAVE_TIME_SHEET_ENTRY_REQUEST,
  SAVE_TIME_SHEET_ENTRY_SUCCESS,
  SUBMIT_TIME_SHEET_APPROVAL_FAIL,
  SUBMIT_TIME_SHEET_APPROVAL_REQUEST,
  SUBMIT_TIME_SHEET_APPROVAL_SUCCESS,
  UPDATE_TIME_SHEET_ENTRY_FAIL,
  UPDATE_TIME_SHEET_ENTRY_REQUEST,
  CLEAR_SUCCESS_FLAG,
  RESET_UPDATE_TIME_SHEET_ENTRY_FAIL,
  GET_LAST_THREE_DATES_TIMESHEET_ENTRY_FAIL,
  GET_LAST_THREE_DATES_TIMESHEET_ENTRY_REQUEST,
  GET_LAST_THREE_DATES_TIMESHEET_ENTRY_SUCCESS,
} from "./timeSheetActionType";

export const clearSuccessFlag = () => {
  return {
    type: CLEAR_SUCCESS_FLAG,
  };
};

const saveTimeSheetEntryRequest = () => {
  return {
    type: SAVE_TIME_SHEET_ENTRY_REQUEST,
  };
};
const saveTimeSheetEntrySuccess = () => {
  return {
    type: SAVE_TIME_SHEET_ENTRY_SUCCESS,
  };
};
const saveTimeSheetEntryFail = () => {
  return {
    type: SAVE_TIME_SHEET_ENTRY_FAIL,
  };
};
const updateTimeSheetEntryRequest = () => {
  return {
    type: UPDATE_TIME_SHEET_ENTRY_REQUEST,
  };
};

const updateTimeSheetEntryFail = () => {
  return {
    type: UPDATE_TIME_SHEET_ENTRY_FAIL,
  };
};
const deleteTimeSheetEntryRequest = () => {
  return {
    type: SAVE_TIME_SHEET_ENTRY_REQUEST,
  };
};
const deleteTimeSheetEntrySuccess = () => {
  return {
    type: SAVE_TIME_SHEET_ENTRY_SUCCESS,
  };
};
const deleteTimeSheetEntryFail = () => {
  return {
    type: SAVE_TIME_SHEET_ENTRY_FAIL,
  };
};

const getTimesheetEntryRequest = () => {
  return {
    type: GET_TIME_SHEET_ENTRY_REQUEST,
  };
};
const getTimesheetEntrySuccess = (response) => {
  return {
    type: GET_TIME_SHEET_ENTRY_SUCCESS,
    payload: response,
  };
};
const getTimesheetEntryFail = () => {
  return {
    type: GET_TIME_SHEET_ENTRY_FAIL,
  };
};

const getTimeSheetApprovalRequest = () => {
  return {
    type: GET_TIME_SHEET_APPROVAL_REQUEST,
  };
};
const getTimeSheetApprovalSuccess = (data) => {
  return {
    type: GET_TIME_SHEET_APPROVAL_SUCCESS,
    payload: data,
  };
};
const getTimeSheetApprovalFail = () => {
  return {
    type: GET_TIME_SHEET_APPROVAL_FAIL,
  };
};
const submitTimeSheetApprovalRequest = () => {
  return {
    type: SUBMIT_TIME_SHEET_APPROVAL_REQUEST,
  };
};
const submitTimeSheetApprovalSuccess = () => {
  return {
    type: SUBMIT_TIME_SHEET_APPROVAL_SUCCESS,
  };
};
const submitTimeSheetApprovalFail = () => {
  return {
    type: SUBMIT_TIME_SHEET_APPROVAL_FAIL,
  };
};
const approveTimesheetRequest = () => {
  return {
    type: APPROVE_TIME_SHEET_REQUEST,
  };
};
const approveTimesheetSuccess = () => {
  return {
    type: APPROVE_TIME_SHEET_SUCCESS,
  };
};
const approveTimesheetFail = () => {
  return {
    type: APPROVE_TIME_SHEET_FAIL,
  };
};
const rejectTimesheetRequest = () => {
  return {
    type: REJECT_TIME_SHEET_REQUEST,
  };
};
const rejectTimesheetSuccess = () => {
  return {
    type: REJECT_TIME_SHEET_SUCCESS,
  };
};
const rejectTimesheetFail = () => {
  return {
    type: REJECT_TIME_SHEET_FAIL,
  };
};

export const resetUpdateTimesheet = () => {
  return {
    type: RESET_UPDATE_TIME_SHEET_ENTRY_FAIL,
  };
};

const getLastThreeDaysTimesheetEntryRequest = () => {
  return {
    type: GET_LAST_THREE_DATES_TIMESHEET_ENTRY_REQUEST,
  };
};
const getLastThreeDaysTimesheetEntrySuccess = (response) => {
  return {
    type: GET_LAST_THREE_DATES_TIMESHEET_ENTRY_SUCCESS,
    payload: response,
  };
};
const getLastThreeDaysTimesheetEntryFail = () => {
  return {
    type: GET_LAST_THREE_DATES_TIMESHEET_ENTRY_FAIL,
  };
};

export const getTimesheetEntryAction = (date) => {
  return async (dispatch) => {
    try {
      dispatch(getTimesheetEntryRequest());
      const response = await makeRequest(
        "GET",
        `api/timesheet/getByDate/${date}`
      );
      dispatch(getTimesheetEntrySuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getTimesheetEntryFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
export const getTimesheetEntryApprovalAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(getTimeSheetApprovalRequest());
      const response = await makeRequest(
        "GET",
        `/api/timesheetentry/getTimesheetForApproval`,
        null,
        data
      );
      dispatch(getTimeSheetApprovalSuccess(response));
    } catch (err) {
      dispatch(getTimeSheetApprovalFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
export const saveTimeSheetEntryAction = (timeSheetData, date) => {
  return async (dispatch) => {
    try {
      dispatch(saveTimeSheetEntryRequest());
      const response = await makeRequest(
        "POST",
        "/api/timesheetentry/create",
        timeSheetData
      );
      dispatch(saveTimeSheetEntrySuccess());
      dispatch(getTimesheetEntryAction(date));
      toast.success("Timesheet Entry Successful", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return response;
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else if (err.response.data.errorCode === 500){
        dispatch(saveTimeSheetEntryFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};
export const updateTimeSheetEntryAction = (timeSheetData, date) => {
  return async (dispatch) => {
    try {
      dispatch(updateTimeSheetEntryRequest());
      await makeRequest("POST", `/api/timesheetentry/create`, timeSheetData);
      dispatch(getTimesheetEntryAction(date));
      toast.success("Timesheet Updated Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      if (err.response.data.errorCode === 500) {
        dispatch(updateTimeSheetEntryFail(err.response.data.errorMessage));
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(updateTimeSheetEntryFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
      dispatch(getTimesheetEntryAction(date));
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};
export const deleteTimeSheetEntryAction = (id, date) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTimeSheetEntryRequest());
      const response = await makeRequest("DELETE", `/api/timesheetentry/${id}`);
      dispatch(deleteTimeSheetEntrySuccess(response?.token));
      dispatch(getTimesheetEntryAction(date));
      toast.success("Timesheet Deleted Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      // indicating that the login credentials are invalid
      dispatch(deleteTimeSheetEntryFail(err.response.data.errorMessage));
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
export const submitTimeSheetApprovalAction = (date) => {
  return async (dispatch) => {
    try {
      dispatch(submitTimeSheetApprovalRequest());
      await makeRequest("POST", `api/timesheetentry/submitForApproval/${date}`);
      dispatch(submitTimeSheetApprovalSuccess());
      dispatch(getTimesheetEntryAction(date));
      toast.success("Timesheet Submitted Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      toast.info("Timesheet entry is already submitted", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(submitTimeSheetApprovalFail(err.response.data.errorMessage));
    }
  };
};
export const approveTimesheet = (data, newPayload) => {
  return async (dispatch) => {
    try {
      dispatch(approveTimesheetRequest());
      await makeRequest(
        "POST",
        `/api/timesheetentry/setTimesheetEntryApprovalStatusByMgr`,
        data
      );
      dispatch(approveTimesheetSuccess());
      dispatch(getTimesheetEntryApprovalAction(newPayload));
      toast.success("Timesheet Approved Successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err?.response?.data?.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      toast.error(err.response.data.errorMessage || err.response.data, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(approveTimesheetFail(err.response.data.errorMessage));
    }
  };
};
export const rejectTimesheet = (data, newPayload) => {
  return async (dispatch) => {
    try {
      dispatch(rejectTimesheetRequest());
      await makeRequest(
        "POST",
        `/api/timesheetentry/setTimesheetEntryApprovalStatusByMgr`,
        data
      );
      dispatch(rejectTimesheetSuccess());
      dispatch(getTimesheetEntryApprovalAction(newPayload));
      toast.success("Timesheet Rejected Successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err?.response?.data?.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      toast.info(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(rejectTimesheetFail(err?.response?.data?.errorMessage));
    }
  };
};

export const getLastThreeTimesheetEntryAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(getLastThreeDaysTimesheetEntryRequest());
      const response = await makeRequest(
        "GET",
        `api/timesheetentry/lastThreeWorkingDays`,
        null,
        data
      );
     
      // Console log the response here
      console.log("response", response);
      dispatch(getLastThreeDaysTimesheetEntrySuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getLastThreeDaysTimesheetEntryFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
