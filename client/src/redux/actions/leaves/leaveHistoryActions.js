// actions.js
import {
  FETCH_LEAVE_HISTORY_REQUEST,
  FETCH_LEAVE_HISTORY_SUCCESS,
  FETCH_LEAVE_HISTORY_FAILURE,
} from "./leaveHistoryActionType";
import makeRequest from "../../../api/api";
import { getRefreshToken } from "../login/loginAction";
import { errorMessage } from "../errors/errorsAction";

// Action creators
export const fetchLeaveHistoryRequest = () => ({
  type: FETCH_LEAVE_HISTORY_REQUEST,
});

export const fetchLeaveHistorySuccess = (data) => ({
  type: FETCH_LEAVE_HISTORY_SUCCESS,
  payload: data,
});

export const fetchLeaveHistoryFailure = (error) => ({
  type: FETCH_LEAVE_HISTORY_FAILURE,
  payload: error,
});

export const fetchLeaveHistory = (page) => {
  return async (dispatch) => {
    try {
      dispatch(fetchLeaveHistoryRequest());
      const response = await makeRequest(
        "GET",
        `/api/leaveHistory/get`,
        null,
        page
      );
      dispatch(fetchLeaveHistorySuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(fetchLeaveHistoryFailure());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};
