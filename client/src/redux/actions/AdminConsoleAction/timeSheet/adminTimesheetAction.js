import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
import {
  SEARCH_USERNAME_REQUEST,
  SEARCH_USERNAME_SUCCESS,
  SEARCH_USERNAME_FAILURE,
  GET_ALL_TIMESTEET_APPROVERS_FAILURE,
  GET_ALL_TIMESTEET_APPROVERS_REQUEST,
  GET_ALL_TIMESTEET_APPROVERS_SUCCESS,
  GET_ALL_TIMESHEET_FOR_ADMIN_FAILURE,
  GET_ALL_TIMESHEET_FOR_ADMIN_REQUEST,
  GET_ALL_TIMESHEET_FOR_ADMIN_SUCCESS,
} from "./adminTimesheetActionType";
import { getRefreshToken } from "../../login/loginAction";

const searchUserRequest = () => {
  return {
    type: SEARCH_USERNAME_REQUEST,
  };
};

const searchUserSuccess = (data) => {
  return {
    type: SEARCH_USERNAME_SUCCESS,
    payload: data,
  };
};

const searchUserFailure = () => {
  return {
    type: SEARCH_USERNAME_FAILURE,
  };
};

const getTimeSheetApproversRequest = () => {
  return {
    type: GET_ALL_TIMESTEET_APPROVERS_REQUEST,
  };
};

const getTimeSheetApproversSuccess = (data) => {
  return {
    type: GET_ALL_TIMESTEET_APPROVERS_SUCCESS,
    payload: data,
  };
};

const getTimeSheetApproversFailure = () => {
  return {
    type: GET_ALL_TIMESTEET_APPROVERS_FAILURE,
  };
};

const getAllTimesheetForAdminRequest = () => {
  return {
    type: GET_ALL_TIMESHEET_FOR_ADMIN_REQUEST,
  };
};
const getAllTimesheetForAdminSuccess = (data) => {
  return {
    type: GET_ALL_TIMESHEET_FOR_ADMIN_SUCCESS,
    payload: data,
  };
};
const getAllTimesheetForAdminFailure = () => {
  return {
    type: GET_ALL_TIMESHEET_FOR_ADMIN_FAILURE,
  };
};
export const searchUserAction = (data) => {
  return async (dispatch) => {
    dispatch(searchUserRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/timesheetentry/searchEmployees",
        null,
        {
          employeeName: data,
        }
      );
      dispatch(searchUserSuccess(response));
    } catch (err) {
      dispatch(searchUserFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getAllTimeSheetApprovers = (data) => {
  return async (dispatch) => {
    dispatch(getTimeSheetApproversRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/timesheetentry/approvers",
        null,
        data
      );
      dispatch(getTimeSheetApproversSuccess(response));
    } catch (err) {
      dispatch(getTimeSheetApproversFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getAllTimeSheetForAdmin = (data, payload) => {
  return async (dispatch) => {
    dispatch(getAllTimesheetForAdminRequest());
    try {
      const response = await makeRequest(
        "POST",
        "api/timesheetentry/getTimesheetForAdmin",
        {
          result: payload ? [payload] : [],
        },
        data
      );
      dispatch(getAllTimesheetForAdminSuccess(response));
    } catch (err) {
      dispatch(getAllTimesheetForAdminFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const adminRejectTimesheet = (data, newPayload, search, params) => {
  return async (dispatch) => {
    try {
      await makeRequest(
        "POST",
        `/api/timesheetentry/setTimesheetEntryApprovalStatusByAdmin`,
        data
      );

      dispatch(getAllTimeSheetForAdmin(newPayload, search));
      dispatch(getAllTimeSheetApprovers(params));
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
    }
  };
};

export const adminApproveTimesheet = (data, newPayload, search, params) => {
  return async (dispatch) => {
    try {
      await makeRequest(
        "POST",
        `/api/timesheetentry/setTimesheetEntryApprovalStatusByAdmin`,
        data
      );
      dispatch(getAllTimeSheetForAdmin(newPayload, search));
      dispatch(getAllTimeSheetApprovers(params));

      toast.success("Timesheet Approved Successfully.", {
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
    }
  };
};

export const adminBulkApproveTimesheet = (data, newPayload, search, params) => {
  return async (dispatch) => {
    try {
      await makeRequest(
        "POST",
        `/api/timesheetentry/setTimesheetEntryApprovalStatusByAdmin`,
        data
      );
      dispatch(getAllTimeSheetForAdmin(newPayload, search));
      dispatch(getAllTimeSheetApprovers(params));

      toast.success("Timesheets Approved Successfully.", {
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
    }
  };
};
