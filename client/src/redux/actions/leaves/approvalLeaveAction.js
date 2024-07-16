import { toast } from "react-toastify";
import makeRequest, { downloadApi } from "../../../api/api";
import { errorMessage } from "../errors/errorsAction";
import { getRefreshToken } from "../login/loginAction";
import {
  APPROVAL_LEAVE_DATES_FAIL,
  APPROVAL_LEAVE_DATES_REQUEST,
  APPROVAL_LEAVE_DATES_SUCCESS,
  APPROVAL_LEAVE_TEAM_MEMBER_FAIL,
  APPROVAL_LEAVE_TEAM_MEMBER_REQUEST,
  APPROVAL_LEAVE_TEAM_MEMBER_SUCCESS,
  APPROVE_LEAVES_FAIL,
  APPROVE_LEAVES_REQUEST,
  APPROVE_LEAVES_SUCCESS,
  GET_LEAVE_FAIL,
  GET_LEAVE_REQUEST,
  GET_LEAVE_SUCCESS,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAIL,
} from "./approvalLeaveActionType";


const getApprovalLeaveDatesRequest = () => {
  return {
    type: APPROVAL_LEAVE_DATES_REQUEST,
  };
};

const getApprovalLeaveDatesSuccess = (data) => {
  return {
    type: APPROVAL_LEAVE_DATES_SUCCESS,
    payload: data,
  };
};
const getApprovalLeaveDatesFail = () => {
  return {
    type: APPROVAL_LEAVE_DATES_FAIL,
  };
};

const getApprovalLeaveTeamMemberRequest = () => {
  return {
    type: APPROVAL_LEAVE_TEAM_MEMBER_REQUEST,
  };
};

const getApprovalLeaveTeamMemberSuccess = (data) => {
  return {
    type: APPROVAL_LEAVE_TEAM_MEMBER_SUCCESS,
    payload: data,
  };
};
const getApprovalLeaveTeamMemberFail = () => {
  return {
    type: APPROVAL_LEAVE_TEAM_MEMBER_FAIL,
  };
};

const getLeaveRequestAction = () => {
  return {
    type: GET_LEAVE_REQUEST,
  };
};
const getLeaveRequestSuccess = (data) => {
  return {
    type: GET_LEAVE_SUCCESS,
    payload: data,
  };
};
const getLeaveRequestFail = () => {
  return {
    type: GET_LEAVE_FAIL,
  };
};

const approveLeavesRequest = () => {
  return {
    type: APPROVE_LEAVES_REQUEST,
  };
};

const approveLeavesSuccess = () => {
  return {
    type: APPROVE_LEAVES_SUCCESS,
  };
};
const approveLeavesFail = () => {
  return {
    type: APPROVE_LEAVES_FAIL,
  };
};
const downloadFileRequest = () => ({
  type: DOWNLOAD_FILE_REQUEST,
});

const downloadFileSuccess = (data) => ({
  type: DOWNLOAD_FILE_SUCCESS,
  payload: data,
});

const downloadFileFail = () => ({
  type: DOWNLOAD_FILE_FAIL,
});

export const getApprovalLeaveDatesAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getApprovalLeaveDatesRequest());
      const response = await makeRequest("GET", `/api/masters`);
      dispatch(getApprovalLeaveDatesSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getApprovalLeaveDatesFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const getApprovalLeaveTeamMemberAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(getApprovalLeaveTeamMemberRequest());
      const response = await makeRequest(
        "GET",
        `/api/approver/getEmployeesByApprover`,
        null,
        payload
      );
      dispatch(getApprovalLeaveTeamMemberSuccess(response));
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      dispatch(getApprovalLeaveTeamMemberFail());
      dispatch(errorMessage(err.response.data.errorMessage));
    }
  };
};

export const getLeaveRequestData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(getLeaveRequestAction());
      const response = await makeRequest(
        "GET",
        "/api/leave/getLeaveRequestApproval",
        null,
        data
      );
      dispatch(getLeaveRequestSuccess(response));
      return data;
    } catch (err) {
      if (err.response.data.errorCode === 403) {
        dispatch(getRefreshToken());
      } else if (err.response.data.errorCode === 500) {
        dispatch(getLeaveRequestFail(err.response.data.errorMessage));
      }
    }
  };
};

export const approveRejectLeavesAction = (data, getDataPayload) => {
  return async (dispatch) => {
    try {
      dispatch(approveLeavesRequest());
      await makeRequest(
        "POST",
        `/api/leave/setLeaveApprovalStatusByApprover`,
        data
      );
      dispatch(approveLeavesSuccess());
      dispatch(getLeaveRequestData(getDataPayload));
      if (data.status === "APPROVED") {
        toast.success("Leaves Approved Successfully.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (data.status === "REJECTED") {
        toast.success("Leaves Rejected Successfully.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      if (err?.response?.data?.errorCode === 403) {
        dispatch(getRefreshToken());
      }
      // Handle 403 error here
      // For example, you can dispatch an action to update the state
      dispatch(approveLeavesFail(err.response.data.errorMessage));
    }
  };
};

export const downloadFileAction = (file, fileName) => {
  return async (dispatch) => {
    try {
      dispatch(downloadFileRequest());
      const response = await downloadApi("GET", `${file}`, { responseType: 'blob' });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        dispatch(downloadFileSuccess(response.data));
      } else {
        dispatch(downloadFileFail());
      }
    } catch (err) {
      dispatch(downloadFileFail());
      // Optionally handle errors here, e.g., dispatching a notification action
      console.error("File download error:", err);
    }
  };
};

