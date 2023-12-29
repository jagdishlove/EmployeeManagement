// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import makeRequest from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  HOLIDAY_LIST_FAIL,
  HOLIDAY_LIST_REQUEST,
  HOLIDAY_LIST_SUCCESS,
  LEAVE_BALANCE_FAIL,
  LEAVE_BALANCE_REQUEST,
  LEAVE_BALANCE_SUCCESS,
  SAVE_LEAVE_FORM_FAIL,
  SAVE_LEAVE_FORM_REQUEST,
  SAVE_LEAVE_FORM_SUCCESS,
  SEARCH_EMAIL_FAIL,
  SEARCH_EMAIL_REQUEST,
  SEARCH_EMAIL_SUCCESS,
  DELETE_LEAVE_FAILURE,
  DELETE_LEAVE_REQUEST,
  DELETE_LEAVE_SUCCESS,
} from "./leavesActionType";

const getLeaveBalanceRequest = () => {
  return {
    type: LEAVE_BALANCE_REQUEST,
  };
};

const getLeaveBalanceSuccess = (data) => {
  return {
    type: LEAVE_BALANCE_SUCCESS,
    payload: data,
  };
};
const getLeaveBalanceFail = () => {
  return {
    type: LEAVE_BALANCE_FAIL,
  };
};

const getHolidayListRequest = () => {
  return {
    type: HOLIDAY_LIST_REQUEST,
  };
};

const getHolidayListSuccess = (data) => {
  return {
    type: HOLIDAY_LIST_SUCCESS,
    payload: data,
  };
};
const getHolidayListFail = () => {
  return {
    type: HOLIDAY_LIST_FAIL,
  };
};

const getSearchEmailRequest = () => {
  return {
    type: SEARCH_EMAIL_REQUEST,
  };
};

const getSearchEmailSuccess = (data) => {
  return {
    type: SEARCH_EMAIL_SUCCESS,
    payload: data,
  };
};
const getSearchEmailFail = () => {
  return {
    type: SEARCH_EMAIL_FAIL,
  };
};

const saveLeaveFormRequest = () => {
  return {
    type: SAVE_LEAVE_FORM_REQUEST,
  };
};

const saveLeaveFormSuccess = (data) => {
  return {
    type: SAVE_LEAVE_FORM_SUCCESS,
    payload: data,
  };
};
const saveLeaveFormFail = () => {
  return {
    type: SAVE_LEAVE_FORM_FAIL,
  };
};

const getNumberOfDays = (data) => {
  return {
    type: "NUMBERS_OF_DAYS",
    payload: data,
  };
};

const deleteLeaveRequest = () => {
  return {
    type: DELETE_LEAVE_REQUEST,
  };
};

const deleteLeaveSuccess = () => {
  return {
    type: DELETE_LEAVE_SUCCESS,
  };
};

const deleteLeaveFailure = () => {
  return {
    type: DELETE_LEAVE_FAILURE,
  };
};

export const getLeaveBalanceAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getLeaveBalanceRequest());
      const response = await makeRequest("GET", `/api/leave/balance`);
      dispatch(getLeaveBalanceSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getLeaveBalanceFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const getHolidayListAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getHolidayListRequest());
      const response = await makeRequest("GET", `/api/leave/holidays`);
      dispatch(getHolidayListSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getHolidayListFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const getSearchEmailAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(getSearchEmailRequest());
      const response = await makeRequest(
        "GET",
        `/api/leave/searchForEmail?partialEmail=${payload}`
      );
      dispatch(getSearchEmailSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getSearchEmailFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const saveLeaveFormAction = (data, param, disableSave) => {
  return async (dispatch, getState) => {
    let newData = {};
    if (
      ["SUBMITTED", "APPROVED", "SAVED"].includes(disableSave) &&
      param.action === "Save"
    ) {
      newData = {
        ...data,
        leaveRequestId:
          getState()?.nonPersist?.leavesData.savedLeaveData.leaveRequestId ||
          data.leaveRequestId ||
          undefined,
      };
    } else {
      newData = {
        ...data,
        leaveRequestId:
          getState()?.nonPersist?.leavesData.savedLeaveData.leaveRequestId ||
          data.leaveRequestId ||
          undefined,
      };
    }

    try {
      dispatch(saveLeaveFormRequest());
      const response = await makeRequest(
        "POST",
        "/api/leave/apply",
        newData,
        param
      );
      dispatch(saveLeaveFormSuccess(response));
      if (param.action === "Save") {
        toast.success("Leave Applied Successfully Saved", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (param.action === "Submit") {
        toast.success("Leave Applied Successfully Submitted", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
      return response;
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else if (err.response.data.errorCode === 500) {
        dispatch(saveLeaveFormFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

export const getNumbersOfDaysAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await makeRequest("POST", "/api/leave/noOfDays", data);
      dispatch(getNumberOfDays(response));
    } catch (err) {
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const deleteLeave = (leaveRequestId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteLeaveRequest());
      // Make the API call to delete the leave request
      await makeRequest("DELETE", `/api/leave/${leaveRequestId}`);
      dispatch(deleteLeaveSuccess());
      toast.success("Leave Request Deleted Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else {
        dispatch(deleteLeaveFailure());
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};
