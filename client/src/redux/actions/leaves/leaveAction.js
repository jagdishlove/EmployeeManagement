// import { toast } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import makeRequest, { addRequest } from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  ALL_EMPLOYEES_LEAVE_FAIL,
  ALL_EMPLOYEES_LEAVE_REQUEST,
  ALL_EMPLOYEES_LEAVE_SUCCESS,
  DELETE_LEAVE_FAILURE,
  DELETE_LEAVE_REQUEST,
  DELETE_LEAVE_SUCCESS,
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

const getAllLeaveRequestsOfEmployeesRequest = () => {
  return {
    type: ALL_EMPLOYEES_LEAVE_REQUEST,
  };
};

const getAllLeaveRequestsOfEmployeesSuccess = (data) => {
  return {
    type: ALL_EMPLOYEES_LEAVE_SUCCESS,
    payload: data,
  };
};
const getAllLeaveRequestsOfEmployeesFail = () => {
  return {
    type: ALL_EMPLOYEES_LEAVE_FAIL,
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

export const saveLeaveFormAction = (
  data,
  param,
  disableSave,
  setLeaveBalance
) => {
  return async (dispatch) => {
    console.log("disableSave", disableSave);
    let formData = new FormData();

    formData.append("fromDate", formatDate(data.fromDate));
    formData.append("toDate", formatDate(data.toDate));
    formData.append("file", data.file); // Assuming 'file' is the key expected by the server

    for (const key in data) {
      if (key !== "file") {
        formData.append(key, data[key]);
      }
    }
    try {
      dispatch(saveLeaveFormRequest());
      const response = await addRequest(
        "POST",
        "/api/leave/apply",
        formData,
        param
      );
      dispatch(saveLeaveFormSuccess(response));
      if (param.action === "Save") {
        toast.success("Your leaves are saved successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setLeaveBalance(true);
      } else if (param.action === "Submit") {
        toast.success(
          "Your leaves have been submitted successfully for approval ",
          {
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
        setLeaveBalance(true);
      }
      dispatch({ type: "NUMBERS_OF_DAYS", payload: { numberOfDays: "" } });
      return response;
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 403
      ) {
        dispatch(getRefreshToken());
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errorCode === 500
      ) {
        dispatch(saveLeaveFormFail(err.response.data.errorMessage));
        toast.error(err.response.data.errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
};

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

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

export const getAllLeaveRequestsOfEmployeesAction = (counter = 15) => {
  return async (dispatch) => {
    try {
      dispatch(getAllLeaveRequestsOfEmployeesRequest());
      // Use dayjs or another library to format dates as YYYY-MM-DD
      const fromDate = dayjs().startOf("month").format("YYYY-MM-DD");
      const toDate = dayjs().endOf("month").format("YYYY-MM-DD");
      const response = await makeRequest(
        "GET",
        `/api/leave/getAllLeaveRequestsOfEmployees`,
        null,
        { dateBand: "CALENDER", page: 0, size: counter, fromDate, toDate }
      );
      dispatch(getAllLeaveRequestsOfEmployeesSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getAllLeaveRequestsOfEmployeesFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
