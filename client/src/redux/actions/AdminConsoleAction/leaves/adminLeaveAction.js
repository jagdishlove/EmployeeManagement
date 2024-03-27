import { toast } from "react-toastify";
import makeRequest from "../../../../api/api";
import {
  GET_ALL_LEAVES_FOR_ADMIN_FAILURE,
  GET_ALL_LEAVES_FOR_ADMIN_REQUEST,
  GET_ALL_LEAVES_FOR_ADMIN_SUCCESS,
  GET_ALL_LEAVES_APPROVERS_REQUEST,
  GET_ALL_LEAVES_APPROVERS_SUCCESS,
  GET_ALL_LEAVES_APPROVERS_FAILURE,
} from "./adminLeaveActionType";

const getAllLeavesForAdminRequest = () => {
  return {
    type: GET_ALL_LEAVES_FOR_ADMIN_REQUEST,
  };
};
const getAllLeavesForAdminSuccess = (data) => {
  return {
    type: GET_ALL_LEAVES_FOR_ADMIN_SUCCESS,
    payload: data,
  };
};
const getAllLeavesForAdminFailure = () => {
  return {
    type: GET_ALL_LEAVES_FOR_ADMIN_FAILURE,
  };
};

const getLeavesApproversRequest = () => {
  return {
    type: GET_ALL_LEAVES_APPROVERS_REQUEST,
  };
};

const getLeavesApproversSuccess = (data) => {
  return {
    type: GET_ALL_LEAVES_APPROVERS_SUCCESS,
    payload: data,
  };
};

const getLeavesApproversFailure = () => {
  return {
    type: GET_ALL_LEAVES_APPROVERS_FAILURE,
  };
};

export const getAllLeavesForAdminAction = (payload, getPayload) => {
  return async (dispatch) => {
    dispatch(getAllLeavesForAdminRequest());
    try {
      const response = await makeRequest(
        "POST",
        "api/leave/leaveRequestApprovalsForAdmin",
        {
          result: payload ? [payload] : [],
        },
        getPayload
      );
      dispatch(getAllLeavesForAdminSuccess(response));
    } catch (err) {
      dispatch(getAllLeavesForAdminFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const getAllLeavesApproversAction = (data) => {
  return async (dispatch) => {
    dispatch(getLeavesApproversRequest());
    try {
      const response = await makeRequest(
        "GET",
        "api/leave/approvers",
        null,
        data
      );
      dispatch(getLeavesApproversSuccess(response));
    } catch (err) {
      dispatch(getLeavesApproversFailure());
      toast.error(err.response.data.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
};

export const adminApproveRejectLeavesAction = (
  data,
  getDataPayload,
  newPayload
) => {
  return async (dispatch) => {
    try {
      await makeRequest(
        "POST",
        `/api/leave/setLeaveApprovalStatusByAdmin`,
        data
      );
      dispatch(getAllLeavesForAdminAction(newPayload, getDataPayload));
      data?.forEach((item) => {
        if (item.status === "APPROVED") {
          toast.success("Leaves Approved Successfully.", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else if (item.status === "REJECTED") {
          toast.success("Leaves Rejected Successfully.", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
    } catch (err) {
      if (err?.response?.data?.errorCode === 403) {
        // Handle 403 error here
        // For example, you can dispatch an action to update the state
      }
    }
  };
};
